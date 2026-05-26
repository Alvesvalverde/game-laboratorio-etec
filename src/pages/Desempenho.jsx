import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Desempenho() {
  const navigate = useNavigate();
  const location = useLocation();

  const dados = location.state || {
    modo: "Modo 1 - Fácil",
    pontuacao: 0,
    acertos: 0,
    erros: 0,
    totalPerguntas: 0,
  };

  const totalRespondidas = dados.acertos + dados.erros;

  const percentual =
    dados.totalPerguntas > 0
      ? Math.round((dados.acertos / dados.totalPerguntas) * 100)
      : 0;

  function jogarNovamente() {
    if (dados.modo.includes("Modo 2")) {
      navigate("/jogo-modo-2");
    } else {
      navigate("/jogo-modo-1");
    }
  }

  return (
    <>
      <Header />

      <main className="desempenho-page">
        <section className="desempenho-container">
          <div className="page-title-row">
            <div>
              <p className="page-subtitle">Resultado da partida</p>
              <h1>Resumo de Desempenho</h1>
            </div>

            <button className="back-button" onClick={() => navigate("/aluno")}>
              Voltar ao menu
            </button>
          </div>

          <section className="resultado-hero">
            <div className="resultado-info">
              <span className="resultado-icon">🎯</span>
              <p>Modo jogado</p>
              <h2>{dados.modo}</h2>
            </div>

            <div className="resultado-score">
              <p>Pontuação Final</p>
              <strong>{dados.pontuacao}</strong>
              <span>pontos</span>
            </div>
          </section>

          <section className="desempenho-grid">
            <div className="desempenho-card">
              <span className="desempenho-icon">✅</span>
              <p>Acertos</p>
              <strong>{dados.acertos}</strong>
            </div>

            <div className="desempenho-card">
              <span className="desempenho-icon">❌</span>
              <p>Erros</p>
              <strong>{dados.erros}</strong>
            </div>

            <div className="desempenho-card">
              <span className="desempenho-icon">📌</span>
              <p>Total de perguntas</p>
              <strong>{dados.totalPerguntas}</strong>
            </div>

            <div className="desempenho-card">
              <span className="desempenho-icon">📊</span>
              <p>Aproveitamento</p>
              <strong>{percentual}%</strong>
            </div>
          </section>

          <section className="progress-section">
            <div className="progress-header">
              <span>Desempenho geral</span>
              <strong>{percentual}%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percentual}%` }}
              ></div>
            </div>

            <p className="progress-description">
              Você respondeu {totalRespondidas} pergunta(s). Continue praticando
              para melhorar seu reconhecimento dos materiais laboratoriais.
            </p>
          </section>

          <section className="desempenho-actions">
            <button className="primary-action-button" onClick={jogarNovamente}>
              Jogar novamente
            </button>

            <button className="back-button" onClick={() => navigate("/ranking")}>
              Ver ranking
            </button>

            <button className="secondary-action-button" onClick={() => navigate("/aluno")}>
              Menu do aluno
            </button>
          </section>
        </section>
      </main>
    </>
  );
}

export default Desempenho;