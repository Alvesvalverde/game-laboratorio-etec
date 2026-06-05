import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function RecuperarSenha() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailEnviado, setEmailEnviado] = useState(false);

  function recuperarSenha(event) {
    event.preventDefault();

    const emailDigitado = email.trim().toLowerCase();

    const alunosCadastrados =
      JSON.parse(localStorage.getItem("alunosSistema")) || [];

    const alunoEncontrado = alunosCadastrados.find(
      (aluno) => aluno.email.toLowerCase() === emailDigitado
    );

    const emailTesteValido =
      emailDigitado.includes("aluno") || emailDigitado.includes("professor");

    if (!emailTesteValido && !alunoEncontrado) {
      toast.error("Email não encontrado no sistema.");
      return;
    }

    setEmailEnviado(true);
    toast.success("Instruções de recuperação enviadas!");
  }

  return (
    <main className="login-page">
      <Toaster position="top-right" />

      <section className="login-container">
        <div className="login-logo">
          <img src="/Logo_etec.jpg" alt="Logo ETEC" />
        </div>

        <div className="recover-card">
          <h1>Recuperar senha</h1>

          {!emailEnviado ? (
            <>
              <p>
                Informe o email cadastrado no sistema. Enviaremos as instruções
                para redefinição de senha.
              </p>

              <form onSubmit={recuperarSenha}>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />

                <button type="submit" className="recover-main-button">
                  ENVIAR INSTRUÇÕES
                </button>
              </form>
            </>
          ) : (
            <div className="recover-success-box">
              <h2>Solicitação registrada</h2>

              <p>
                Se o email informado estiver cadastrado, as instruções de
                recuperação serão enviadas.
              </p>

              <p className="recover-warning">
                Nesta versão do front-end, o envio é apenas simulado. Com o
                backend, essa ação enviará um email real com link/token de
                redefinição.
              </p>
            </div>
          )}

          <button
            type="button"
            className="recover-secondary-button"
            onClick={() => navigate("/")}
          >
            Voltar ao login
          </button>
        </div>
      </section>
    </main>
  );
}

export default RecuperarSenha;