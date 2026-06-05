import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

function DesempenhoAluno() {
  const navigate = useNavigate();
  const { id } = useParams();
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

const acessoNegado =
  usuarioLogado?.tipo === "aluno" && String(usuarioLogado.id) !== String(id);
  const alunosPadrao = [
    {
      id: 1,
      nome: "Aluno A",
      email: "alunoa@etec.com",
      turma: "1º Química A",
      pontos: 120,
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Aluno B",
      email: "alunob@etec.com",
      turma: "1º Química A",
      pontos: 90,
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Aluno C",
      email: "alunoc@etec.com",
      turma: "1º Química A",
      pontos: 70,
      status: "Ativo",
    },
    {
      id: 4,
      nome: "Aluno D",
      email: "alunod@etec.com",
      turma: "1º Química A",
      pontos: 50,
      status: "Ativo",
    },
    {
      id: 5,
      nome: "Aluno E",
      email: "alunoe@etec.com",
      turma: "1º Química A",
      pontos: 30,
      status: "Ativo",
    },
  ];

  const alunosCadastrados =
    JSON.parse(localStorage.getItem("alunosSistema")) || [];

  const alunos = [...alunosPadrao, ...alunosCadastrados];

  const aluno = alunos.find((item) => String(item.id) === String(id));

  const historicoCompleto =
    JSON.parse(localStorage.getItem("historicoDesempenho")) || [];

  const historicoAluno = historicoCompleto.filter(
    (item) => String(item.alunoId) === String(id)
  );

  const totalPartidas = historicoAluno.length;

  const pontuacaoTotal = historicoAluno.reduce(
    (total, item) => total + item.pontuacao,
    0
  );

  const totalAcertos = historicoAluno.reduce(
    (total, item) => total + item.acertos,
    0
  );

  const totalErros = historicoAluno.reduce(
    (total, item) => total + item.erros,
    0
  );

  const totalPerguntas = historicoAluno.reduce(
    (total, item) => total + item.totalPerguntas,
    0
  );

  const percentual =
    totalPerguntas > 0 ? Math.round((totalAcertos / totalPerguntas) * 100) : 0;
if (acessoNegado) {
  return (
    <>
      <Header />

      <main className="desempenho-page">
        <section className="desempenho-container">
          <div className="empty-performance">
            <h2>Acesso restrito</h2>
            <p>
              Você não tem permissão para visualizar o desempenho de outro
              aluno.
            </p>

            <button
              className="primary-action-button"
              onClick={() => navigate("/ranking")}
            >
              Voltar para o ranking
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
  if (!aluno) {
    return (
      <>
        <Header />

        <main className="desempenho-page">
          <section className="desempenho-container">
            <div className="empty-performance">
              <h2>Aluno não encontrado</h2>
              <p>Não foi possível localizar os dados deste aluno.</p>

              <button
                className="primary-action-button"
                onClick={() => navigate("/alunos")}
              >
                Voltar para alunos
              </button>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="desempenho-page">
        <section className="desempenho-container">
          <div className="page-title-row">
            <div>
              <p className="page-subtitle">Desempenho individual</p>
              <h1>{aluno.nome}</h1>
            </div>

            <button className="back-button" onClick={() => navigate("/alunos")}>
              Voltar
            </button>
          </div>

          <section className="student-profile-summary">
            <div>
              <span>Aluno</span>
              <strong>{aluno.nome}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{aluno.email}</strong>
            </div>

            <div>
              <span>Turma</span>
              <strong>{aluno.turma}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>{aluno.status}</strong>
            </div>
          </section>

          <section className="desempenho-grid">
            <div className="desempenho-card">
              <span className="desempenho-icon">🎮</span>
              <p>Partidas jogadas</p>
              <strong>{totalPartidas}</strong>
            </div>

            <div className="desempenho-card">
              <span className="desempenho-icon">✅</span>
              <p>Total de acertos</p>
              <strong>{totalAcertos}</strong>
            </div>

            <div className="desempenho-card">
              <span className="desempenho-icon">❌</span>
              <p>Total de erros</p>
              <strong>{totalErros}</strong>
            </div>

            <div className="desempenho-card">
              <span className="desempenho-icon">⭐</span>
              <p>Pontuação acumulada</p>
              <strong>{pontuacaoTotal || aluno.pontos}</strong>
            </div>
          </section>

          <section className="progress-section">
            <div className="progress-header">
              <span>Aproveitamento geral</span>
              <strong>{percentual}%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percentual}%` }}
              ></div>
            </div>

            <p className="progress-description">
              Este painel mostra o histórico individual do aluno selecionado.
              Quando o backend for integrado, esses dados virão diretamente do
              banco MySQL.
            </p>
          </section>

          <section className="historico-card">
            <h2>Histórico de partidas</h2>

            {historicoAluno.length === 0 ? (
              <p className="empty-message">
                Este aluno ainda não possui partidas registradas.
              </p>
            ) : (
              <table className="historico-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Modo</th>
                    <th>Pontuação</th>
                    <th>Acertos</th>
                    <th>Erros</th>
                  </tr>
                </thead>

                <tbody>
                  {historicoAluno.map((item) => (
                    <tr key={item.id}>
                      <td>{item.data}</td>
                      <td>{item.modo}</td>
                      <td>{item.pontuacao} pts</td>
                      <td>{item.acertos}</td>
                      <td>{item.erros}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </section>
      </main>
    </>
  );
}

export default DesempenhoAluno;