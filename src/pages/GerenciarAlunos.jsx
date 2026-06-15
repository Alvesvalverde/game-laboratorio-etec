import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { api } from "../services/api";

function GerenciarAlunos() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [alunos, setAlunos] = useState([]);

  async function carregarAlunos() {
    try { setAlunos(await api.listarAlunos()); }
    catch (error) { alert(error.message || "Erro ao carregar alunos."); }
  }
  useEffect(() => { carregarAlunos(); }, []);

  const alunosFiltrados = alunos.filter((aluno) => aluno.nome.toLowerCase().includes(busca.toLowerCase()));

  async function removerAluno(idAluno) {
    if (!window.confirm("Tem certeza que deseja remover este aluno?")) return;
    try { await api.removerAluno(idAluno); await carregarAlunos(); }
    catch (error) { alert(error.message || "Erro ao remover aluno."); }
  }

  return (
    <>
      <Header />
      <main className="alunos-page"><section className="alunos-container">
        <div className="page-title-row"><div><p className="page-subtitle">Área do professor</p><h1>Gerenciamento de Alunos</h1></div><div className="page-actions"><button className="back-button" onClick={() => navigate("/professor")}>Voltar</button><button className="primary-action-button" onClick={() => navigate("/adicionar-aluno")}>+ Adicionar Aluno</button></div></div>
        <section className="alunos-summary"><div className="summary-card"><strong>{alunos.length}</strong><span>Alunos cadastrados</span></div><div className="summary-card"><strong>{alunos.filter((a) => a.status === "Ativo").length}</strong><span>Alunos ativos</span></div><div className="summary-card"><strong>MySQL</strong><span>Fonte dos dados</span></div></section>
        <section className="alunos-tools"><input type="text" placeholder="Pesquisar aluno pelo nome..." value={busca} onChange={(e) => setBusca(e.target.value)} /></section>
        <section className="alunos-table-card"><table className="alunos-table"><thead><tr><th>ID</th><th>Nome</th><th>Email</th><th>Turma</th><th>Pontuação</th><th>Status</th><th>Ações</th></tr></thead><tbody>{alunosFiltrados.map((aluno) => (<tr key={aluno.id}><td>#{aluno.id}</td><td>{aluno.nome}</td><td>{aluno.email}</td><td>{aluno.turma}</td><td>{aluno.pontos} pts</td><td><span className="status-badge">{aluno.status}</span></td><td><button className="table-action-button" onClick={() => navigate(`/alunos/${aluno.id}/desempenho`)}>Ver</button><button className="table-action-button danger" onClick={() => removerAluno(aluno.id)}>Remover</button></td></tr>))}</tbody></table>{alunosFiltrados.length === 0 && <p className="empty-message">Nenhum aluno encontrado.</p>}</section>
      </section></main>
    </>
  );
}
export default GerenciarAlunos;
