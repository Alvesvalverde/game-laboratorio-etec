
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
const port = Number(process.env.API_PORT || 3001);

app.use(cors());
app.use(express.json({ limit: "15mb" }));

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "laboratorio_game",
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
});

function perguntaFront(row, alternativas = [], dica = "") {
  const alt = alternativas.map((a, idx) => ({
    id: a.id_alternativa,
    letra: String.fromCharCode(65 + idx),
    texto: a.texto || "",
    imagem: a.imagem_url || "",
    correta: Boolean(a.correta),
  }));
  const correta = alt.find((a) => a.correta);
  return {
    id: row.id_pergunta,
    modo: String(row.nivel || row.id_modo),
    modoTexto: row.nivel === 2 ? "Modo 2 - Médio" : "Modo 1 - Fácil",
    tipoPergunta: row.tipo_pergunta,
    enunciado: row.enunciado,
    imagem: row.imagem_url || "/icons.svg",
    pontuacao: row.pontuacao || (row.nivel === 2 ? 15 : 10),
    dica: dica || "Sem dica cadastrada.",
    respostaCorreta: row.resposta_correta_texto || correta?.texto || "",
    alternativaCorreta: correta?.letra || "A",
    alternativas: alt,
    dificuldade: row.nivel === 2 ? "Médio" : "Fácil",
    status: row.ativa ? "Ativa" : "Inativa",
    origem: "Banco de Dados",
    dataCriacao: row.data_criacao,
  };
}

async function carregarPergunta(id) {
  const [rows] = await pool.query(
    `SELECT p.*, m.nivel FROM perguntas p JOIN modos_jogo m ON m.id_modo = p.id_modo WHERE p.id_pergunta = ?`,
    [id]
  );
  if (!rows.length) return null;
  const [alternativas] = await pool.query(
    `SELECT * FROM alternativas WHERE id_pergunta = ? ORDER BY ordem`,
    [id]
  );
  const [dicas] = await pool.query(
    `SELECT texto_dica FROM dicas WHERE id_pergunta = ? LIMIT 1`,
    [id]
  );
  return perguntaFront(rows[0], alternativas, dicas[0]?.texto_dica || "");
}

app.get("/api/health", async (_req, res) => {
  await pool.query("SELECT 1");
  res.json({ ok: true });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, senha } = req.body;
  const [rows] = await pool.query(
    `SELECT u.id_usuario, u.nome, u.email, u.senha_hash, u.tipo_usuario, t.nome_turma
       FROM usuarios u LEFT JOIN turmas t ON t.id_turma = u.id_turma
      WHERE u.email = ? AND u.ativo = TRUE LIMIT 1`,
    [String(email || "").trim().toLowerCase()]
  );
  const usuario = rows[0];
  if (!usuario || usuario.senha_hash !== String(senha || "")) {
    return res.status(401).json({ message: "Email ou senha inválidos." });
  }
  res.json({
    id: usuario.id_usuario,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo_usuario,
    turma: usuario.nome_turma || null,
  });
});

app.get("/api/turmas", async (_req, res) => {
  const [rows] = await pool.query(`SELECT id_turma AS id, nome_turma AS nome FROM turmas WHERE ativa = TRUE ORDER BY nome_turma`);
  res.json(rows);
});

app.get("/api/alunos", async (_req, res) => {
  const [rows] = await pool.query(`
    SELECT u.id_usuario AS id, u.nome, u.email, COALESCE(t.nome_turma, '') AS turma,
           IF(u.ativo, 'Ativo', 'Inativo') AS status,
           COALESCE(SUM(p.pontuacao_total), 0) AS pontos
      FROM usuarios u
      LEFT JOIN turmas t ON t.id_turma = u.id_turma
      LEFT JOIN partidas p ON p.id_aluno = u.id_usuario AND p.status_partida = 'finalizada'
     WHERE u.tipo_usuario = 'aluno' AND u.ativo = TRUE
     GROUP BY u.id_usuario, u.nome, u.email, t.nome_turma, u.ativo
     ORDER BY u.nome`);
  res.json(rows);
});

app.post("/api/alunos", async (req, res) => {
  const { nome, email, senha, turma } = req.body;
  let idTurma = null;
  if (turma) {
    const [t] = await pool.query(`SELECT id_turma FROM turmas WHERE nome_turma = ? LIMIT 1`, [turma]);
    if (t.length) idTurma = t[0].id_turma;
    else {
      const [r] = await pool.query(`INSERT INTO turmas (nome_turma, ano_letivo) VALUES (?, YEAR(CURDATE()))`, [turma]);
      idTurma = r.insertId;
    }
  }
  const [result] = await pool.query(
    `INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario, id_turma) VALUES (?, ?, ?, 'aluno', ?)`,
    [nome, String(email).trim().toLowerCase(), senha, idTurma]
  );
  res.status(201).json({ id: result.insertId, nome, email, turma, status: "Ativo", pontos: 0 });
});

app.delete("/api/alunos/:id", async (req, res) => {
  await pool.query(`UPDATE usuarios SET ativo = FALSE WHERE id_usuario = ? AND tipo_usuario = 'aluno'`, [req.params.id]);
  res.json({ ok: true });
});

app.get("/api/perguntas", async (req, res) => {
  const params = [];
  let where = "WHERE p.ativa = TRUE";
  if (req.query.modo) {
    where += " AND m.nivel = ?";
    params.push(Number(req.query.modo));
  }
  const [rows] = await pool.query(
    `SELECT p.*, m.nivel FROM perguntas p JOIN modos_jogo m ON m.id_modo = p.id_modo ${where} ORDER BY p.id_pergunta`,
    params
  );
  const saida = [];
  for (const row of rows) saida.push(await carregarPergunta(row.id_pergunta));
  res.json(saida);
});

app.get("/api/perguntas/:id", async (req, res) => {
  const pergunta = await carregarPergunta(req.params.id);
  if (!pergunta) return res.status(404).json({ message: "Pergunta não encontrada." });
  res.json(pergunta);
});

async function salvarAlternativas(conn, perguntaId, alternativas, corretaLetra) {
  await conn.query(`DELETE FROM alternativas WHERE id_pergunta = ?`, [perguntaId]);
  const letras = ["A", "B", "C", "D"];
  for (let i = 0; i < letras.length; i++) {
    const letra = letras[i];
    const texto = typeof alternativas === "object" && !Array.isArray(alternativas)
      ? alternativas[letra]
      : alternativas?.[i]?.texto || alternativas?.[i] || "";
    await conn.query(
      `INSERT INTO alternativas (id_pergunta, texto, correta, ordem) VALUES (?, ?, ?, ?)`,
      [perguntaId, texto, letra === corretaLetra, i + 1]
    );
  }
}

async function salvarDica(conn, perguntaId, dica) {
  await conn.query(`DELETE FROM dicas WHERE id_pergunta = ?`, [perguntaId]);
  if (dica) await conn.query(`INSERT INTO dicas (id_pergunta, texto_dica) VALUES (?, ?)`, [perguntaId, dica]);
}

app.post("/api/perguntas", async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const modoNivel = Number(req.body.modo || 1);
    const [modos] = await conn.query(`SELECT id_modo FROM modos_jogo WHERE nivel = ? LIMIT 1`, [modoNivel]);
    if (!modos.length) throw new Error("Modo de jogo não encontrado.");
    const correta = req.body.alternativaCorreta || "A";
    const resposta = req.body.alternativas?.[correta] || req.body.respostaCorreta || "";
    const [result] = await conn.query(
      `INSERT INTO perguntas (id_modo, id_professor_criador, enunciado, imagem_url, tipo_pergunta, resposta_correta_texto, pontuacao)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [modos[0].id_modo, req.body.idProfessor || null, req.body.enunciado, req.body.imagem || "/icons.svg", req.body.tipoPergunta || "multipla_escolha", resposta, Number(req.body.pontuacao || 10)]
    );
    await salvarAlternativas(conn, result.insertId, req.body.alternativas, correta);
    await salvarDica(conn, result.insertId, req.body.dica || "");
    await conn.commit();
    res.status(201).json(await carregarPergunta(result.insertId));
  } catch (err) {
    await conn.rollback();
    res.status(400).json({ message: err.message });
  } finally { conn.release(); }
});

app.put("/api/perguntas/:id", async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const modoNivel = Number(req.body.modo || 1);
    const [modos] = await conn.query(`SELECT id_modo FROM modos_jogo WHERE nivel = ? LIMIT 1`, [modoNivel]);
    const correta = req.body.alternativaCorreta || "A";
    const resposta = req.body.alternativas?.[correta] || req.body.respostaCorreta || "";
    await conn.query(
      `UPDATE perguntas SET id_modo=?, enunciado=?, imagem_url=?, tipo_pergunta=?, resposta_correta_texto=?, pontuacao=? WHERE id_pergunta=?`,
      [modos[0].id_modo, req.body.enunciado, req.body.imagem || "/icons.svg", req.body.tipoPergunta || "multipla_escolha", resposta, Number(req.body.pontuacao || 10), req.params.id]
    );
    await salvarAlternativas(conn, req.params.id, req.body.alternativas, correta);
    await salvarDica(conn, req.params.id, req.body.dica || "");
    await conn.commit();
    res.json(await carregarPergunta(req.params.id));
  } catch (err) {
    await conn.rollback();
    res.status(400).json({ message: err.message });
  } finally { conn.release(); }
});

app.delete("/api/perguntas/:id", async (req, res) => {
  await pool.query(`UPDATE perguntas SET ativa = FALSE WHERE id_pergunta = ?`, [req.params.id]);
  res.json({ ok: true });
});

app.post("/api/partidas", async (req, res) => {
  const { alunoId, modo, pontuacao, acertos, erros, totalPerguntas } = req.body;
  const [modos] = await pool.query(`SELECT id_modo FROM modos_jogo WHERE nivel = ? LIMIT 1`, [Number(modo)]);
  if (!modos.length) return res.status(400).json({ message: "Modo inválido." });
  const [r] = await pool.query(
    `INSERT INTO partidas (id_aluno, id_modo, pontuacao_total, quantidade_acertos, quantidade_erros, total_perguntas, data_fim, status_partida)
     VALUES (?, ?, ?, ?, ?, ?, NOW(), 'finalizada')`,
    [alunoId, modos[0].id_modo, pontuacao, acertos, erros, totalPerguntas]
  );
  res.status(201).json({ id: r.insertId });
});

app.get("/api/desempenho", async (req, res) => {
  const params = [];
  let where = `WHERE p.status_partida='finalizada'`;
  if (req.query.alunoId) { where += ` AND p.id_aluno = ?`; params.push(req.query.alunoId); }
  const [rows] = await pool.query(`
    SELECT p.id_partida AS id, u.id_usuario AS alunoId, u.nome AS alunoNome,
           CONCAT('Modo ', m.nivel, IF(m.nivel=2, ' - Médio', ' - Fácil')) AS modo,
           p.pontuacao_total AS pontuacao, p.quantidade_acertos AS acertos,
           p.quantidade_erros AS erros, p.total_perguntas AS totalPerguntas,
           DATE_FORMAT(COALESCE(p.data_fim, p.data_inicio), '%d/%m/%Y %H:%i') AS data
      FROM partidas p
      JOIN usuarios u ON u.id_usuario = p.id_aluno
      JOIN modos_jogo m ON m.id_modo = p.id_modo
      ${where}
      ORDER BY COALESCE(p.data_fim, p.data_inicio) DESC`, params);
  res.json(rows);
});

app.get("/api/alunos/:id/desempenho", async (req, res) => {
  const [alunos] = await pool.query(`SELECT u.id_usuario AS id, u.nome, u.email, COALESCE(t.nome_turma,'') AS turma, IF(u.ativo,'Ativo','Inativo') AS status FROM usuarios u LEFT JOIN turmas t ON t.id_turma=u.id_turma WHERE u.id_usuario=? AND u.tipo_usuario='aluno'`, [req.params.id]);
  if (!alunos.length) return res.status(404).json({ message: "Aluno não encontrado." });
  const [hist] = await pool.query(`
    SELECT p.id_partida AS id, CONCAT('Modo ', m.nivel, IF(m.nivel=2, ' - Médio', ' - Fácil')) AS modo,
           p.pontuacao_total AS pontuacao, p.quantidade_acertos AS acertos, p.quantidade_erros AS erros,
           p.total_perguntas AS totalPerguntas, DATE_FORMAT(COALESCE(p.data_fim, p.data_inicio), '%d/%m/%Y %H:%i') AS data
      FROM partidas p JOIN modos_jogo m ON m.id_modo=p.id_modo
     WHERE p.id_aluno=? AND p.status_partida='finalizada' ORDER BY COALESCE(p.data_fim, p.data_inicio) DESC`, [req.params.id]);
  res.json({ aluno: alunos[0], historico: hist });
});

app.get("/api/ranking", async (_req, res) => {
  const [rows] = await pool.query(`
    SELECT u.id_usuario AS id, u.nome, u.email, COALESCE(t.nome_turma, '') AS turma,
           COALESCE(SUM(p.pontuacao_total), 0) AS pontos,
           COALESCE(SUM(p.quantidade_acertos), 0) AS acertos,
           COALESCE(SUM(p.quantidade_erros), 0) AS erros,
           COUNT(p.id_partida) AS partidasJogadas
      FROM usuarios u
      LEFT JOIN turmas t ON t.id_turma = u.id_turma
      LEFT JOIN partidas p ON p.id_aluno = u.id_usuario AND p.status_partida='finalizada'
     WHERE u.tipo_usuario='aluno' AND u.ativo=TRUE
     GROUP BY u.id_usuario, u.nome, u.email, t.nome_turma
     ORDER BY pontos DESC, acertos DESC, u.nome`);
  res.json(rows.map((r, i) => ({ ...r, posicao: i + 1 })));
});

app.get("/api/usuarios/existe", async (req, res) => {
  const [rows] = await pool.query(`SELECT id_usuario FROM usuarios WHERE email=? AND ativo=TRUE LIMIT 1`, [String(req.query.email || '').trim().toLowerCase()]);
  res.json({ existe: rows.length > 0 });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Erro interno no servidor." });
});

app.listen(port, () => console.log(`API conectada na porta ${port}`));
