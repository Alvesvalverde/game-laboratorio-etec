import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { api } from "../services/api";

function ListaPerguntas() {
  const navigate = useNavigate();
  const { modo } = useParams();
  const modoAtual = modo === "2" ? "2" : "1";
  const modoFormatado = modoAtual === "2" ? "Modo 2 - Médio" : "Modo 1 - Fácil";
  const [perguntas, setPerguntas] = useState([]);

  async function carregarPerguntas() {
    try { setPerguntas(await api.listarPerguntas(modoAtual)); }
    catch (error) { alert(error.message || "Erro ao carregar perguntas."); }
  }
  useEffect(() => { carregarPerguntas(); }, [modoAtual]);

  async function excluirPergunta(idPergunta) {
    if (!window.confirm("Tem certeza que deseja excluir esta pergunta?")) return;
    try { await api.removerPergunta(idPergunta); await carregarPerguntas(); }
    catch (error) { alert(error.message || "Erro ao excluir pergunta."); }
  }

  return (
    <>
      <Header />
      <main className="lista-perguntas-page"><section className="lista-perguntas-container">
        <div className="page-title-row"><div><p className="page-subtitle">Gerenciamento de perguntas</p><h1>{modoFormatado}</h1></div><div className="page-actions"><button className="back-button" onClick={() => navigate("/professor")}>Voltar</button><button className="primary-action-button" onClick={() => navigate(`/adicionar-pergunta/${modoAtual}`)}>+ Nova Pergunta</button></div></div>
        <section className="questions-summary"><div className="summary-card"><strong>{perguntas.length}</strong><span>Perguntas cadastradas</span></div><div className="summary-card"><strong>{perguntas.filter((p) => p.status === "Ativa").length}</strong><span>Perguntas ativas</span></div><div className="summary-card"><strong>{modoFormatado}</strong><span>Modo selecionado</span></div></section>
        <section className="questions-list-card"><table className="questions-table"><thead><tr><th>ID</th><th>Pergunta</th><th>Resposta correta</th><th>Dificuldade</th><th>Origem</th><th>Status</th><th>Ações</th></tr></thead><tbody>{perguntas.map((pergunta) => (<tr key={pergunta.id}><td>#{pergunta.id}</td><td>{pergunta.enunciado}</td><td>{pergunta.respostaCorreta}</td><td>{pergunta.dificuldade}</td><td>{pergunta.origem}</td><td><span className="status-badge">{pergunta.status}</span></td><td><button className="table-action-button" onClick={() => navigate(`/editar-pergunta/${pergunta.id}`)}>Editar</button><button className="table-action-button danger" onClick={() => excluirPergunta(pergunta.id)}>Excluir</button></td></tr>))}</tbody></table>{perguntas.length === 0 && <p className="empty-message">Nenhuma pergunta cadastrada.</p>}</section>
      </section></main>
    </>
  );
}
export default ListaPerguntas;
