import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  function enviarFormulario(event) {
    event.preventDefault();

    const emailDigitado = event.target
      .querySelector("input[type='email']")
      .value
      .toLowerCase();

    if (emailDigitado.includes("aluno")) {
      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify({
          id: 2,
          nome: "Aluno Teste",
          email: emailDigitado,
          tipo: "aluno",
          turma: "1º Química A",
        })
      );

      toast.success("Login de aluno realizado com sucesso!");
      setTimeout(() => navigate("/aluno"), 800);
    } else if (emailDigitado.includes("professor")) {
      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify({
          id: 1,
          nome: "Professor Teste",
          email: emailDigitado,
          tipo: "professor",
        })
      );

      toast.success("Login de professor realizado com sucesso!");
      setTimeout(() => navigate("/professor"), 800);
    } else {
      toast.error("Use aluno@etec.com ou professor@etec.com para testar.");
    }
  }

  return (
    <main className="login-page">
      <Toaster position="top-right" />

      <section className="login-container">
        <div className="login-logo">
          <img src="/Logo_etec.jpg" alt="Logo ETEC" />
        </div>

        <div className="login-card">
          <div className="login-left">
            <h2>Bem-vindo de volta!</h2>
            <p>Acesse sua conta</p>

            <button type="button" className="small-button active">
              Entrar
            </button>
          </div>

          <div className="login-right">
            <h3>Entrar</h3>

            <form onSubmit={enviarFormulario}>
              <input type="email" placeholder="EMAIL" required />
              <input type="password" placeholder="SENHA" required />

              <button type="submit" className="submit-button">
                ENTRAR
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;