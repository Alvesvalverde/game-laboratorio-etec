import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { api } from "../services/api";
import { getUsuarioLogado } from "../services/session";

function DesempenhoAluno() {
  const navigate = useNavigate();
  const { id } = useParams();
  const usuarioLogado = getUsuarioLogado();
  const [aluno, setAluno] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [erro, setErro] = useState("");
  const acessoNegado = usuarioLogado?.tipo === "aluno" && String(usuarioLogado.id) !== String(id);
  useEffect(() => { if (!acessoNegado) api.desempenhoAluno(id).then((d) => { setAluno(d.aluno); setHistorico(d.historico); }).catch((e) => setErro(e.message)); }, [id, acessoNegado]);
  const totalPartidas = historico.length;
  const pontuacaoTotal = historico.reduce((t, i) => t + Number(i.pontuacao || 0), 0);
  const totalAcertos = historico.reduce((t, i) => t + Number(i.acertos || 0), 0);
  const totalErros = historico.reduce((t, i) => t + Number(i.erros || 0), 0);
  const totalPerguntas = historico.reduce((t, i) => t + Number(i.totalPerguntas || 0), 0);
  const percentual = totalPerguntas > 0 ? Math.round((totalAcertos / totalPerguntas) * 100) : 0;
  if (acessoNegado) return (<><Header /><main className="desempenho-page"><section className="desempenho-container"><div className="empty-performance"><h2>Acesso restrito</h2><p>Você não tem permissão para visualizar outro aluno.</p><button className="primary-action-button" onClick={() => navigate("/ranking")}>Voltar</button></div></section></main></>);
  if (erro) return (<><Header /><main className="desempenho-page"><section className="desempenho-container"><div className="empty-performance"><h2>Aluno não encontrado</h2><p>{erro}</p><button className="primary-action-button" onClick={() => navigate("/alunos")}>Voltar</button></div></section></main></>);
  if (!aluno) return (<><Header /><main className="desempenho-page"><section className="desempenho-container"><p>Carregando...</p></section></main></>);
  return (<><Header /><main className="desempenho-page"><section className="desempenho-container"><div className="page-title-row"><div><p className="page-subtitle">Desempenho individual</p><h1>{aluno.nome}</h1></div><button className="back-button" onClick={() => navigate("/alunos")}>Voltar</button></div>
    <section className="student-profile-summary"><div><span>Aluno</span><strong>{aluno.nome}</strong></div><div><span>Email</span><strong>{aluno.email}</strong></div><div><span>Turma</span><strong>{aluno.turma}</strong></div><div><span>Status</span><strong>{aluno.status}</strong></div></section>
    <section className="desempenho-grid"><div className="desempenho-card"><span className="desempenho-icon">🎮</span><p>Partidas jogadas</p><strong>{totalPartidas}</strong></div><div className="desempenho-card"><span className="desempenho-icon">✅</span><p>Total de acertos</p><strong>{totalAcertos}</strong></div><div className="desempenho-card"><span className="desempenho-icon">❌</span><p>Total de erros</p><strong>{totalErros}</strong></div><div className="desempenho-card"><span className="desempenho-icon">⭐</span><p>Pontuação acumulada</p><strong>{pontuacaoTotal}</strong></div></section>
    <section className="progress-section"><div className="progress-header"><span>Aproveitamento geral</span><strong>{percentual}%</strong></div><div className="progress-bar"><div className="progress-fill" style={{ width: `${percentual}%` }}></div></div><p className="progress-description">Dados carregados diretamente do banco MySQL.</p></section>
    <section className="historico-card"><h2>Histórico de partidas</h2>{historico.length === 0 ? <p className="empty-message">Este aluno ainda não possui partidas registradas.</p> : <table className="historico-table"><thead><tr><th>Data</th><th>Modo</th><th>Pontuação</th><th>Acertos</th><th>Erros</th></tr></thead><tbody>{historico.map((item) => <tr key={item.id}><td>{item.data}</td><td>{item.modo}</td><td>{item.pontuacao} pts</td><td>{item.acertos}</td><td>{item.erros}</td></tr>)}</tbody></table>}</section>
  </section></main></>);
}
export default DesempenhoAluno;
