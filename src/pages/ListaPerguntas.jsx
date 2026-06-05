import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

function ListaPerguntas() {
  const navigate = useNavigate();
  const { modo } = useParams();

  const modoAtual = modo === "2" ? "2" : "1";
  const modoFormatado = modoAtual === "2" ? "Modo 2 - Médio" : "Modo 1 - Fácil";

  const perguntasPadrao = [
    {
      id: 1,
      modo: "1",
      enunciado: "Qual é o nome deste material?",
      respostaCorreta: "Béquer",
      dificuldade: "Fácil",
      status: "Ativa",
      origem: "Padrão",
    },
    {
      id: 2,
      modo: "1",
      enunciado: "Qual material é usado para medir volume?",
      respostaCorreta: "Proveta",
      dificuldade: "Fácil",
      status: "Ativa",
      origem: "Padrão",
    },
    {
      id: 3,
      modo: "1",
      enunciado: "Qual material está associado à filtração?",
      respostaCorreta: "Funil",
      dificuldade: "Fácil",
      status: "Ativa",
      origem: "Padrão",
    },
    {
      id: 4,
      modo: "2",
      enunciado: "Qual material está associado ao processo de filtração simples?",
      respostaCorreta: "Funil",
      dificuldade: "Médio",
      status: "Ativa",
      origem: "Padrão",
    },
    {
      id: 5,
      modo: "2",
      enunciado: "Qual material é utilizado para condensar vapores?",
      respostaCorreta: "Condensador",
      dificuldade: "Médio",
      status: "Ativa",
      origem: "Padrão",
    },
  ];

  const perguntasCadastradas =
    JSON.parse(localStorage.getItem("perguntasSistema")) || [];

  const perguntas = [...perguntasPadrao, ...perguntasCadastradas].filter(
    (pergunta) => String(pergunta.modo) === String(modoAtual)
  );

  function excluirPergunta(idPergunta, origem) {
    if (origem === "Padrão") {
      alert("As perguntas padrão não podem ser excluídas nesta versão de teste.");
      return;
    }

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta pergunta?"
    );

    if (!confirmar) return;

    const perguntasSalvas =
      JSON.parse(localStorage.getItem("perguntasSistema")) || [];

    const novaLista = perguntasSalvas.filter(
      (pergunta) => String(pergunta.id) !== String(idPergunta)
    );

    localStorage.setItem("perguntasSistema", JSON.stringify(novaLista));

    window.location.reload();
  }

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
                onClick={() => navigate(`/adicionar-pergunta/${modoAtual}`)}
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
                  <th>Origem</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {perguntas.map((pergunta) => (
                  <tr key={pergunta.id}>
                    <td>#{pergunta.id}</td>
                    <td>{pergunta.enunciado}</td>
                    <td>{pergunta.respostaCorreta}</td>
                    <td>
                      {pergunta.dificuldade ||
                        (pergunta.modo === "2" ? "Médio" : "Fácil")}
                    </td>
                    <td>{pergunta.origem || "Professor"}</td>
                    <td>
                      <span className="status-badge">{pergunta.status}</span>
                    </td>
                    <td>
                      <button className="table-action-button">Editar</button>

                      <button
                        className="table-action-button danger"
                        onClick={() =>
                          excluirPergunta(pergunta.id, pergunta.origem)
                        }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {perguntas.length === 0 && (
              <p className="empty-message">Nenhuma pergunta cadastrada.</p>
            )}
          </section>
        </section>
      </main>
    </>
  );
}

export default ListaPerguntas;