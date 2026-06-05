import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Desempenho() {
  const navigate = useNavigate();
  const location = useLocation();

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const historicoCompleto =
    JSON.parse(localStorage.getItem("historicoDesempenho")) || [];

  const historicoFiltrado =
    usuarioLogado?.tipo === "professor"
      ? historicoCompleto
      : historicoCompleto.filter(
          (item) => item.alunoId === usuarioLogado?.id
        );

  const ultimoResultado =
    location.state || historicoFiltrado[historicoFiltrado.length - 1] || null;

  const totalPartidas = historicoFiltrado.length;

  const pontuacaoTotal = historicoFiltrado.reduce(
    (total, item) => total + item.pontuacao,
    0
  );

  const totalAcertos = historicoFiltrado.reduce(
    (total, item) => total + item.acertos,
    0
  );

  const totalErros = historicoFiltrado.reduce(
    (total, item) => total + item.erros,
    0
  );

  const totalPerguntas = historicoFiltrado.reduce(
    (total, item) => total + item.totalPerguntas,
    0
  );

  const percentual =
    totalPerguntas > 0 ? Math.round((totalAcertos / totalPerguntas) * 100) : 0;

  function voltarMenu() {
    if (usuarioLogado?.tipo === "professor") {
      navigate("/professor");
    } else {
      navigate("/aluno");
    }
  }

  function limparHistorico() {
    const confirmar = window.confirm(
      "Tem certeza que deseja limpar o histórico salvo neste navegador?"
    );

    if (!confirmar) return;

    if (usuarioLogado?.tipo === "professor") {
      localStorage.removeItem("historicoDesempenho");
    } else {
      const novoHistorico = historicoCompleto.filter(
        (item) => item.alunoId !== usuarioLogado?.id
      );

      localStorage.setItem(
        "historicoDesempenho",
        JSON.stringify(novoHistorico)
      );
    }

    window.location.reload();
  }

  return (
    <>
      <Header />

      <main className="desempenho-page">
        <section className="desempenho-container">
          <div className="page-title-row">
            <div>
              <p className="page-subtitle">Histórico de desempenho</p>
              <h1>
                {usuarioLogado?.tipo === "professor"
                  ? "Desempenho dos Alunos"
                  : "Meu Desempenho"}
              </h1>
            </div>

            <button className="back-button" onClick={voltarMenu}>
              Voltar ao menu
            </button>
          </div>

          {!usuarioLogado && (
            <section className="empty-performance">
              <h2>Nenhum usuário logado</h2>
              <p>Faça login para visualizar o desempenho.</p>

              <button
                className="primary-action-button"
                onClick={() => navigate("/")}
              >
                Ir para login
              </button>
            </section>
          )}

          {usuarioLogado && historicoFiltrado.length === 0 && (
            <section className="empty-performance">
              <h2>Nenhum desempenho registrado</h2>
              <p>
                Finalize uma partida para que o histórico de desempenho seja
                exibido aqui.
              </p>

              {usuarioLogado.tipo === "aluno" && (
                <button
                  className="primary-action-button"
                  onClick={() => navigate("/aluno")}
                >
                  Jogar agora
                </button>
              )}
            </section>
          )}

          {usuarioLogado && historicoFiltrado.length > 0 && (
            <>
              <section className="resultado-hero">
                <div className="resultado-info">
                  <span className="resultado-icon">🎯</span>
                  <p>Última partida</p>
                  <h2>{ultimoResultado?.modo}</h2>
                  <span>{ultimoResultado?.data}</span>
                </div>

                <div className="resultado-score">
                  <p>Pontuação da última partida</p>
                  <strong>{ultimoResultado?.pontuacao}</strong>
                  <span>pontos</span>
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
                  <strong>{pontuacaoTotal}</strong>
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
                  {usuarioLogado.tipo === "professor"
                    ? "Este histórico reúne os resultados salvos dos alunos neste navegador."
                    : "Este histórico considera apenas as partidas associadas ao aluno logado."}
                </p>
              </section>

              <section className="historico-card">
                <div className="historico-title-row">
                  <h2>Histórico de partidas</h2>

                  <button
                    type="button"
                    className="table-action-button danger"
                    onClick={limparHistorico}
                  >
                    Limpar histórico
                  </button>
                </div>

                <table className="historico-table">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Aluno</th>
                      <th>Modo</th>
                      <th>Pontuação</th>
                      <th>Acertos</th>
                      <th>Erros</th>
                    </tr>
                  </thead>

                  <tbody>
                    {historicoFiltrado.map((item) => (
                      <tr key={item.id}>
                        <td>{item.data}</td>
                        <td>{item.alunoNome}</td>
                        <td>{item.modo}</td>
                        <td>{item.pontuacao} pts</td>
                        <td>{item.acertos}</td>
                        <td>{item.erros}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section className="desempenho-actions">
                {usuarioLogado.tipo === "aluno" && (
                  <>
                    <button
                      className="primary-action-button"
                      onClick={() => navigate("/jogo-modo-1")}
                    >
                      Jogar Modo 1
                    </button>

                    <button
                      className="primary-action-button"
                      onClick={() => navigate("/jogo-modo-2")}
                    >
                      Jogar Modo 2
                    </button>
                  </>
                )}

                <button
                  className="back-button"
                  onClick={() => navigate("/ranking")}
                >
                  Ver ranking
                </button>
              </section>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default Desempenho;