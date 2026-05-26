import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Ranking() {
  const navigate = useNavigate();

  const ranking = [
    { posicao: 1, nome: "Aluno 1", pontos: 100, acertos: 10, erros: 0 },
    { posicao: 2, nome: "Aluno 2", pontos: 90, acertos: 9, erros: 1 },
    { posicao: 3, nome: "Aluno 3", pontos: 80, acertos: 8, erros: 2 },
    { posicao: 4, nome: "Aluno 4", pontos: 70, acertos: 7, erros: 3 },
    { posicao: 5, nome: "Aluno 5", pontos: 60, acertos: 6, erros: 4 },
    { posicao: 6, nome: "Aluno 6", pontos: 50, acertos: 5, erros: 5 },
    { posicao: 7, nome: "Aluno 7", pontos: 40, acertos: 4, erros: 6 },
    { posicao: 8, nome: "Aluno 8", pontos: 30, acertos: 3, erros: 7 },
    { posicao: 9, nome: "Aluno 9", pontos: 20, acertos: 2, erros: 8 },
    { posicao: 10, nome: "Aluno 10", pontos: 10, acertos: 1, erros: 9 },
  ];

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

            <button className="back-button" onClick={() => navigate(-1)}>
              Voltar
            </button>
          </div>

          <section className="ranking-podium">
            <div className="podium-card second-place">
              <span className="medal">🥈</span>
              <h2>{ranking[1].nome}</h2>
              <p>{ranking[1].pontos} pts</p>
            </div>

            <div className="podium-card first-place">
              <span className="medal">🏆</span>
              <h2>{ranking[0].nome}</h2>
              <p>{ranking[0].pontos} pts</p>
            </div>

            <div className="podium-card third-place">
              <span className="medal">🥉</span>
              <h2>{ranking[2].nome}</h2>
              <p>{ranking[2].pontos} pts</p>
            </div>
          </section>

          <section className="ranking-table-card">
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Aluno</th>
                  <th>Pontuação</th>
                  <th>Acertos</th>
                  <th>Erros</th>
                </tr>
              </thead>

              <tbody>
                {ranking.map((aluno) => (
                  <tr key={aluno.posicao}>
                    <td>#{aluno.posicao}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.pontos} pts</td>
                    <td>{aluno.acertos}</td>
                    <td>{aluno.erros}</td>
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