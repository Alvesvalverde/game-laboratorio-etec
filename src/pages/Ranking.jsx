import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { api } from "../services/api";
import { getUsuarioLogado } from "../services/session";

function Ranking() {
  const navigate = useNavigate();
  const usuarioLogado = getUsuarioLogado();
  const [ranking, setRanking] = useState([]);
  useEffect(() => { api.ranking().then(setRanking).catch((e) => alert(e.message)); }, []);
  const topTres = ranking.slice(0, 3);
  function voltarMenu() { navigate(usuarioLogado?.tipo === "professor" ? "/professor" : usuarioLogado?.tipo === "aluno" ? "/aluno" : "/"); }
  return (<><Header /><main className="ranking-page"><section className="ranking-container"><div className="page-title-row"><div><p className="page-subtitle">Classificação geral</p><h1>Ranking dos Alunos</h1></div><button className="back-button" onClick={voltarMenu}>Voltar</button></div>
    {topTres.length > 0 && <section className="ranking-podium">{topTres[1] && <div className="podium-card second-place"><span className="medal">🥈</span><h2>{topTres[1].nome}</h2><p>{topTres[1].pontos} pts</p></div>}{topTres[0] && <div className="podium-card first-place"><span className="medal">🏆</span><h2>{topTres[0].nome}</h2><p>{topTres[0].pontos} pts</p></div>}{topTres[2] && <div className="podium-card third-place"><span className="medal">🥉</span><h2>{topTres[2].nome}</h2><p>{topTres[2].pontos} pts</p></div>}</section>}
    <section className="ranking-table-card"><table className="ranking-table"><thead><tr><th>Posição</th><th>Aluno</th><th>Turma</th><th>Pontuação</th><th>Partidas</th><th>Acertos</th><th>Erros</th><th>Ações</th></tr></thead><tbody>{ranking.map((aluno) => <tr key={aluno.id}><td>#{aluno.posicao}</td><td>{aluno.nome}</td><td>{aluno.turma}</td><td>{aluno.pontos} pts</td><td>{aluno.partidasJogadas}</td><td>{aluno.acertos}</td><td>{aluno.erros}</td><td>{usuarioLogado?.tipo === "professor" || String(usuarioLogado?.id) === String(aluno.id) ? <button className="table-action-button" onClick={() => navigate(`/alunos/${aluno.id}/desempenho`)}>Ver desempenho</button> : <span className="restricted-label">Restrito</span>}</td></tr>)}</tbody></table></section>
  </section></main></>);
}
export default Ranking;
