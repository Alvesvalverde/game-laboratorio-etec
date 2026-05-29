import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

function ListaPerguntas() {
  const navigate = useNavigate();
  const { modo } = useParams();

  const modoFormatado = modo === "2" ? "Modo 2 - Médio" : "Modo 1 - Fácil";

  const perguntas = [
    {
      id: 1,
      titulo: "Qual é o nome deste material?",
      resposta: "Béquer",
      dificuldade: modo === "2" ? "Médio" : "Fácil",
      status: "Ativa",
    },
    {
      id: 2,
      titulo: "Qual material é usado para medir volume?",
      resposta: "Proveta",
      dificuldade: modo === "2" ? "Médio" : "Fácil",
      status: "Ativa",
    },
    {
      id: 3,
      titulo: "Qual material está associado à filtração?",
      resposta: "Funil",
      dificuldade: modo === "2" ? "Médio" : "Fácil",
      status: "Ativa",
    },
  ];

  return (
    <>
      <Header />

      <main className="lista-perguntas-page">
        <section className="lista-perguntas-container">
          <div className="page-title-row">
            <div>
              <p className="page-subtitle">Gerenciamento de perguntas</p>
              <h1>{modoFormatado}</h1>
            </div>

            <div className="page-actions">
              <button className="back-button" onClick={() => navigate("/professor")}>
                Voltar
              </button>

              <button
                className="primary-action-button"
                onClick={() => navigate(`/adicionar-pergunta/${modo}`)}
              >
                + Nova Pergunta
              </button>
            </div>
          </div>

          <section className="questions-summary">
            <div className="summary-card">
              <strong>{perguntas.length}</strong>
              <span>Perguntas cadastradas</span>
            </div>

            <div className="summary-card">
              <strong>{perguntas.filter((p) => p.status === "Ativa").length}</strong>
              <span>Perguntas ativas</span>
            </div>

            <div className="summary-card">
              <strong>{modoFormatado}</strong>
              <span>Modo selecionado</span>
            </div>
          </section>

          <section className="questions-list-card">
            <table className="questions-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Pergunta</th>
                  <th>Resposta correta</th>
                  <th>Dificuldade</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {perguntas.map((pergunta) => (
                  <tr key={pergunta.id}>
                    <td>#{pergunta.id}</td>
                    <td>{pergunta.titulo}</td>
                    <td>{pergunta.resposta}</td>
                    <td>{pergunta.dificuldade}</td>
                    <td>
                      <span className="status-badge">{pergunta.status}</span>
                    </td>
                    <td>
                      <button className="table-action-button">Editar</button>
                      <button className="table-action-button danger">Excluir</button>
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

export default ListaPerguntas;