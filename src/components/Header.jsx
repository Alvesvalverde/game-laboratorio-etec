import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo-area" onClick={() => navigate("/")}>
        <img src="/Logo_etec.jpg" alt="Logo ETEC" className="logo" />
      </div>

      <button className="menu-button" aria-label="Abrir menu">
        ☰
      </button>
    </header>
  );
}

export default Header;