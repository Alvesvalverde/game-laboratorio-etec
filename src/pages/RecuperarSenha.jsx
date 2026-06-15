import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../services/api";

function RecuperarSenha() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailEnviado, setEmailEnviado] = useState(false);
  async function recuperarSenha(event) {
    event.preventDefault();
    try {
      const r = await api.verificarEmail(email.trim().toLowerCase());
      if (!r.existe) return toast.error("Email não encontrado no sistema.");
      setEmailEnviado(true); toast.success("Solicitação registrada!");
    } catch (error) { toast.error(error.message || "Erro ao verificar email."); }
  }
  return (<main className="login-page"><Toaster position="top-right" /><section className="login-container"><div className="login-logo"><img src="/Logo_etec.jpg" alt="Logo ETEC" /></div><div className="recover-card"><h1>Recuperar senha</h1>{!emailEnviado ? <><p>Informe o email cadastrado no sistema.</p><form onSubmit={recuperarSenha}><input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required /><button type="submit" className="recover-main-button">ENVIAR INSTRUÇÕES</button></form></> : <div className="recover-success-box"><h2>Solicitação registrada</h2><p>Se o email informado estiver cadastrado, as instruções serão enviadas.</p><p className="recover-warning">Nesta versão, o envio do email ainda é simulado.</p></div>}<button type="button" className="recover-secondary-button" onClick={() => navigate("/")}>Voltar ao login</button></div></section></main>);
}
export default RecuperarSenha;
