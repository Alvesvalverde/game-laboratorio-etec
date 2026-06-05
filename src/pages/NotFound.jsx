import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  function voltarParaInicio() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuarioLogado?.tipo === "professor") {
      navigate("/professor");
      return;
    }

    if (usuarioLogado?.tipo === "aluno") {
      navigate("/aluno");
      return;
    }

    navigate("/");
  }

  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <div className="not-found-logo">
          <img src="/Logo_etec.jpg" alt="Logo ETEC" />
        </div>

        <span className="not-found-code">404</span>

        <h1>Página não encontrada</h1>

        <p>
          A página que você tentou acessar não existe ou foi movida para outro
          endereço.
        </p>

        <button className="primary-action-button" onClick={voltarParaInicio}>
          Voltar para o início
        </button>
      </section>
    </main>
  );
}

export default NotFound;