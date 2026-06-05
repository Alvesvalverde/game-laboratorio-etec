import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Ranking() {
  const navigate = useNavigate();

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

  const historicoDesempenho =
    JSON.parse(localStorage.getItem("historicoDesempenho")) || [];

  const alunos = [...alunosPadrao, ...alunosCadastrados];

  const ranking = alunos
    .map((aluno) => {
      const partidasAluno = historicoDesempenho.filter(
        (partida) => String(partida.alunoId) === String(aluno.id)
      );

      const pontuacaoHistorico = partidasAluno.reduce(
        (total, partida) => total + partida.pontuacao,
        0
      );

      const totalAcertos = partidasAluno.reduce(
        (total, partida) => total + partida.acertos,
        0
      );

      const totalErros = partidasAluno.reduce(
        (total, partida) => total + partida.erros,
        0
      );

      const partidasJogadas = partidasAluno.length;

      const pontuacaoFinal =
        pontuacaoHistorico > 0 ? pontuacaoHistorico : aluno.pontos || 0;

      return {
        id: aluno.id,
        nome: aluno.nome,
        email: aluno.email,
        turma: aluno.turma,
        pontos: pontuacaoFinal,
        acertos: totalAcertos,
        erros: totalErros,
        partidasJogadas,
      };
    })
    .sort((a, b) => b.pontos - a.pontos)
    .map((aluno, index) => ({
      ...aluno,
      posicao: index + 1,
    }));

  const topTres = ranking.slice(0, 3);

  function voltarMenu() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuarioLogado?.tipo === "professor") {
      navigate("/professor");
    } else if (usuarioLogado?.tipo === "aluno") {
      navigate("/aluno");
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <Header />

      <main className="ranking-page">
        <section className="ranking-container">
          <div className="page-title-row">
            <div>
              <p className="page-subtitle">Classificação geral</p>
              <h1>Ranking dos Alunos</h1>
            </div>

            <button className="back-button" onClick={voltarMenu}>
              Voltar
            </button>
          </div>

          {topTres.length > 0 && (
            <section className="ranking-podium">
              {topTres[1] && (
                <div className="podium-card second-place">
                  <span className="medal">🥈</span>
                  <h2>{topTres[1].nome}</h2>
                  <p>{topTres[1].pontos} pts</p>
                </div>
              )}

              {topTres[0] && (
                <div className="podium-card first-place">
                  <span className="medal">🏆</span>
                  <h2>{topTres[0].nome}</h2>
                  <p>{topTres[0].pontos} pts</p>
                </div>
              )}

              {topTres[2] && (
                <div className="podium-card third-place">
                  <span className="medal">🥉</span>
                  <h2>{topTres[2].nome}</h2>
                  <p>{topTres[2].pontos} pts</p>
                </div>
              )}
            </section>
          )}

          <section className="ranking-table-card">
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Aluno</th>
                  <th>Turma</th>
                  <th>Pontuação</th>
                  <th>Partidas</th>
                  <th>Acertos</th>
                  <th>Erros</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {ranking.map((aluno) => (
                  <tr key={aluno.id}>
                    <td>#{aluno.posicao}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.turma}</td>
                    <td>{aluno.pontos} pts</td>
                    <td>{aluno.partidasJogadas}</td>
                    <td>{aluno.acertos}</td>
                    <td>{aluno.erros}</td>
                    <td>
                      <button
                        className="table-action-button"
                        onClick={() => navigate(`/alunos/${aluno.id}/desempenho`)}
                      >
                        Ver desempenho
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      </main>
    </>
  );
}

export default Ranking;