import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../services/api";
import { setUsuarioLogado } from "../services/session";

function Login() {
  const navigate = useNavigate();

  async function enviarFormulario(event) {
    event.preventDefault();

    const email = event.target.querySelector("input[type='email']").value;
    const senha = event.target.querySelector("input[type='password']").value;

    try {
      const usuario = await api.login(email, senha);
      setUsuarioLogado(usuario);
      toast.success("Login realizado com sucesso!");
      setTimeout(() => navigate(usuario.tipo === "professor" ? "/professor" : "/aluno"), 500);
    } catch (error) {
      toast.error(error.message || "Email ou senha inválidos.");
    }
  }

  return (
    <main className="login-page">
      <Toaster position="top-right" />
      <section className="login-container">
        <div className="login-logo"><img src="/Logo_etec.jpg" alt="Logo ETEC" /></div>
        <div className="login-card">
          <div className="login-left">
            <h2>Bem-vindo de volta!</h2><p>Acesse sua conta</p>
            <button type="button" className="small-button active">Entrar</button>
          </div>
          <div className="login-right">
            <h3>Entrar</h3>
            <form onSubmit={enviarFormulario}>
              <input type="email" placeholder="EMAIL" required />
              <input type="password" placeholder="SENHA" required />
              <button type="button" className="forgot-password-button" onClick={() => navigate("/recuperar-senha")}>Esqueci minha senha</button>
              <button type="submit" className="submit-button">ENTRAR</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Login;
