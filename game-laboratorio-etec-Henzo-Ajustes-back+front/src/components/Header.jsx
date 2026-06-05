import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import UserMenu from './UserMenu'; 

function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Usando o contexto em vez de localStorage
  const [menuAberto, setMenuAberto] = useState(false);

  function voltarParaMenu() {
    // Agora usamos o 'user' do contexto, que é mais seguro e dinâmico
    if (!user) {
      navigate("/");
    } else if (user.role === "PROFESSOR" || user.tipo === "professor") {
      navigate("/professor");
    } else {
      navigate("/aluno");
    }
  }

  return (
    <header className="header">
      <button type="button" className="logo-area" onClick={voltarParaMenu}>
        <img src="/Logo_etec.jpg" alt="Logo ETEC" className="logo" />
      </button>

      <div className="menu-wrapper">
        <button
          type="button"
          className="menu-button"
          aria-label="Abrir menu"
          onClick={() => setMenuAberto((valorAtual) => !valorAtual)}
        >
          ☰
        </button>

        {/* Renderização condicional protegida */}
        {menuAberto && <UserMenu />}
      </div>
    </header>
  );
}

export default Header;