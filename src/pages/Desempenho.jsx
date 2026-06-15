import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { api } from "../services/api";
import { getUsuarioLogado } from "../services/session";

function Desempenho() {
  const navigate = useNavigate();
  const location = useLocation();
  const usuarioLogado = getUsuarioLogado();
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    if (!usuarioLogado) return;
    api.desempenho(usuarioLogado.tipo === "professor" ? null : usuarioLogado.id).then(setHistorico).catch((e) => alert(e.message));
  }, []);

  const ultimoResultado = location.state || historico[0] || null;
  const totalPartidas = historico.length;
  const pontuacaoTotal = historico.reduce((t, i) => t + Number(i.pontuacao || 0), 0);
  const totalAcertos = historico.reduce((t, i) => t + Number(i.acertos || 0), 0);
  const totalErros = historico.reduce((t, i) => t + Number(i.erros || 0), 0);
  const totalPerguntas = historico.reduce((t, i) => t + Number(i.totalPerguntas || 0), 0);
  const percentual = totalPerguntas > 0 ? Math.round((totalAcertos / totalPerguntas) * 100) : 0;
  function voltarMenu() { navigate(usuarioLogado?.tipo === "professor" ? "/professor" : "/aluno"); }

  return (<><Header /><main className="desempenho-page"><section className="desempenho-container">
    <div className="page-title-row"><div><p className="page-subtitle">Histórico de desempenho</p><h1>{usuarioLogado?.tipo === "professor" ? "Desempenho dos Alunos" : "Meu Desempenho"}</h1></div><button className="back-button" onClick={voltarMenu}>Voltar ao menu</button></div>
    {!usuarioLogado && <section className="empty-performance"><h2>Nenhum usuário logado</h2><p>Faça login para visualizar o desempenho.</p><button className="primary-action-button" onClick={() => navigate("/")}>Ir para login</button></section>}
    {usuarioLogado && historico.length === 0 && <section className="empty-performance"><h2>Nenhum desempenho registrado</h2><p>Finalize uma partida para que o histórico seja exibido aqui.</p>{usuarioLogado.tipo === "aluno" && <button className="primary-action-button" onClick={() => navigate("/aluno")}>Jogar agora</button>}</section>}
    {usuarioLogado && historico.length > 0 && <><section className="resultado-hero"><div className="resultado-info"><span className="resultado-icon">🎯</span><p>Última partida</p><h2>{ultimoResultado?.modo}</h2><span>{ultimoResultado?.data}</span></div><div className="resultado-score"><p>Pontuação da última partida</p><strong>{ultimoResultado?.pontuacao}</strong><span>pontos</span></div></section>
    <section className="desempenho-grid"><div className="desempenho-card"><span className="desempenho-icon">🎮</span><p>Partidas jogadas</p><strong>{totalPartidas}</strong></div><div className="desempenho-card"><span className="desempenho-icon">✅</span><p>Total de acertos</p><strong>{totalAcertos}</strong></div><div className="desempenho-card"><span className="desempenho-icon">❌</span><p>Total de erros</p><strong>{totalErros}</strong></div><div className="desempenho-card"><span className="desempenho-icon">⭐</span><p>Pontuação acumulada</p><strong>{pontuacaoTotal}</strong></div></section>
    <section className="progress-section"><div className="progress-header"><span>Aproveitamento geral</span><strong>{percentual}%</strong></div><div className="progress-bar"><div className="progress-fill" style={{ width: `${percentual}%` }}></div></div><p className="progress-description">Dados carregados do banco MySQL.</p></section>
    <section className="historico-card"><div className="historico-title-row"><h2>Histórico de partidas</h2></div><table className="historico-table"><thead><tr><th>Data</th><th>Aluno</th><th>Modo</th><th>Pontuação</th><th>Acertos</th><th>Erros</th></tr></thead><tbody>{historico.map((item) => <tr key={item.id}><td>{item.data}</td><td>{item.alunoNome}</td><td>{item.modo}</td><td>{item.pontuacao} pts</td><td>{item.acertos}</td><td>{item.erros}</td></tr>)}</tbody></table></section>
    <section className="desempenho-actions">{usuarioLogado.tipo === "aluno" && <><button className="primary-action-button" onClick={() => navigate("/jogo-modo-1")}>Jogar Modo 1</button><button className="primary-action-button" onClick={() => navigate("/jogo-modo-2")}>Jogar Modo 2</button></>}<button className="back-button" onClick={() => navigate("/ranking")}>Ver ranking</button></section></>}
  </section></main></>);
}
export default Desempenho;
