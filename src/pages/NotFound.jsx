import { useNavigate } from "react-router-dom";
import { getUsuarioLogado } from "../services/session";
function NotFound() {
  const navigate = useNavigate();
  function voltarParaInicio() {
    const usuarioLogado = getUsuarioLogado();
    if (usuarioLogado?.tipo === "professor") return navigate("/professor");
    if (usuarioLogado?.tipo === "aluno") return navigate("/aluno");
    navigate("/");
  }
  return (<main className="not-found-page"><section className="not-found-card"><div className="not-found-logo"><img src="/Logo_etec.jpg" alt="Logo ETEC" /></div><span className="not-found-code">404</span><h1>Página não encontrada</h1><p>A página que você tentou acessar não existe ou foi movida.</p><button className="primary-action-button" onClick={voltarParaInicio}>Voltar para o início</button></section></main>);
}
export default NotFound;
