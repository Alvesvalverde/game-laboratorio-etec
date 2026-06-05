import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  function voltarParaMenu() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuarioLogado) {
      navigate("/");
      return;
    }

    if (usuarioLogado.tipo === "professor") {
      navigate("/professor");
      return;
    }

    if (usuarioLogado.tipo === "aluno") {
      navigate("/aluno");
      return;
    }

    navigate("/");
  }

  function sair() {
    localStorage.removeItem("usuarioLogado");
    setMenuAberto(false);
    navigate("/");
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

        {menuAberto && (
          <div className="logout-menu">
            <button type="button" onClick={sair}>
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;