import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [modo, setModo] = useState("login");
  const navigate = useNavigate();

function enviarFormulario(event) {
  event.preventDefault();

  if (modo === "login") {
    const emailDigitado = event.target
      .querySelector("input[type='email']")
      .value
      .toLowerCase();

    if (emailDigitado.includes("aluno")) {
      navigate("/aluno");
    } else if (emailDigitado.includes("professor")) {
      navigate("/professor");
    } else {
      alert("Use aluno@etec.com ou professor@etec.com para testar.");
    }
  } else {
    alert("Cadastro realizado com sucesso!");
    setModo("login");
  }
}

  return (
    <main className="login-page">
      <section className="login-container">
        <div className="login-logo">
          <img src="/Logo_etec.jpg" alt="Logo ETEC" />
        </div>

        <div className="login-card">
          <div className="login-left">
            <h2>Bem-vindo de volta!</h2>
            <p>Acesse sua conta</p>

            <button
              type="button"
              className={modo === "login" ? "small-button active" : "small-button"}
              onClick={() => setModo("login")}
            >
              Entrar
            </button>

            <button
              type="button"
              className={modo === "cadastro" ? "small-button active" : "small-button"}
              onClick={() => setModo("cadastro")}
            >
              Criar conta
            </button>
          </div>

          <div className="login-right">
            <h3>{modo === "login" ? "Entrar" : "Criar sua conta"}</h3>

            <form onSubmit={enviarFormulario}>
              {modo === "cadastro" && (
                <input type="text" placeholder="NOME" required />
              )}

              <input type="email" placeholder="EMAIL" required />

              <input type="password" placeholder="SENHA" required />

              <button type="submit" className="submit-button">
                {modo === "login" ? "ENTRAR" : "ENVIAR"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;