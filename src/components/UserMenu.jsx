import { useNavigate } from "react-router-dom";
import { getUsuarioLogado, limparUsuarioLogado } from "../services/session";

function UserMenu() {
  const navigate = useNavigate();
  const user = getUsuarioLogado();
  function sair() { limparUsuarioLogado(); navigate("/"); }
  if (!user) return null;
  return (<div className="user-menu"><span>{user.nome}</span><button onClick={sair}>Sair</button></div>);
}
export default UserMenu;
