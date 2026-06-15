import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { api } from "../services/api";

function AdicionarAluno() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [turma, setTurma] = useState("1º Química A");

  async function salvarAluno(event) {
    event.preventDefault();
    try {
      await api.criarAluno({ nome, email, senha, turma });
      alert("Aluno cadastrado no banco com sucesso!");
      navigate("/alunos");
    } catch (error) {
      alert(error.message || "Erro ao cadastrar aluno.");
    }
  }

  return (
    <>
      <Header />
      <main className="adicionar-aluno-page">
        <section className="adicionar-aluno-container">
          <div className="page-title-row">
            <div><p className="page-subtitle">Área do professor</p><h1>Adicionar Novo Aluno</h1></div>
            <button className="back-button" onClick={() => navigate("/alunos")}>Voltar</button>
          </div>
          <form className="aluno-form-card" onSubmit={salvarAluno}>
            <section className="form-section">
              <h2>Dados do aluno</h2>
              <div className="form-grid">
                <div className="form-field"><label>Nome completo</label><input type="text" placeholder="Digite o nome do aluno" value={nome} onChange={(e) => setNome(e.target.value)} required /></div>
                <div className="form-field"><label>Email</label><input type="email" placeholder="Digite o email do aluno" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                <div className="form-field"><label>Senha provisória</label><input type="password" placeholder="Digite uma senha provisória" value={senha} onChange={(e) => setSenha(e.target.value)} required /></div>
                <div className="form-field"><label>Turma</label><select value={turma} onChange={(e) => setTurma(e.target.value)}><option value="1º Química A">1º Química A</option><option value="1º Química B">1º Química B</option><option value="1º Química C">1º Química C</option></select></div>
              </div>
            </section>
            <section className="form-section"><h2>Observação</h2><p className="form-note">O aluno será salvo no banco MySQL pela API Node/Express.</p></section>
            <div className="form-actions"><button type="submit">SALVAR ALUNO</button><button type="button" className="secondary-button" onClick={() => navigate("/alunos")}>CANCELAR</button></div>
          </form>
        </section>
      </main>
    </>
  );
}
export default AdicionarAluno;
