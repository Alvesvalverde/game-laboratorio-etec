import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function AdicionarAluno() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [turma, setTurma] = useState("1º Química A");

  function salvarAluno(event) {
    event.preventDefault();

    const alunosSalvos =
      JSON.parse(localStorage.getItem("alunosSistema")) || [];

    const novoAluno = {
        id: alunosSalvos.length + 6,
        nome,
        email,
        senha,
        tipo: "aluno",
        turma,
        status: "Ativo",
        pontos: 0,
        dataCadastro: new Date().toLocaleString("pt-BR"),
    };

    localStorage.setItem(
      "alunosSistema",
      JSON.stringify([...alunosSalvos, novoAluno])
    );

    alert("Aluno cadastrado com sucesso!");
    navigate("/alunos");
  }

  return (
    <>
      <Header />

      <main className="adicionar-aluno-page">
        <section className="adicionar-aluno-container">
          <div className="page-title-row">
            <div>
              <p className="page-subtitle">Área do professor</p>
              <h1>Adicionar Novo Aluno</h1>
            </div>

            <button className="back-button" onClick={() => navigate("/alunos")}>
              Voltar
            </button>
          </div>

          <form className="aluno-form-card" onSubmit={salvarAluno}>
            <section className="form-section">
              <h2>Dados do aluno</h2>

              <div className="form-grid">
                <div className="form-field">
                  <label>Nome completo</label>
                  <input
                    type="text"
                    placeholder="Digite o nome do aluno"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Digite o email do aluno"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Senha provisória</label>
                  <input
                    type="password"
                    placeholder="Digite uma senha provisória"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Turma</label>
                  <select
                    value={turma}
                    onChange={(event) => setTurma(event.target.value)}
                  >
                    <option value="1º Química A">1º Química A</option>
                    <option value="1º Química B">1º Química B</option>
                    <option value="1º Química C">1º Química C</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Observação</h2>

              <p className="form-note">
                Nesta versão, o aluno será salvo temporariamente no navegador
                usando localStorage. Na versão com backend, esse cadastro será
                enviado ao banco MySQL.
              </p>
            </section>

            <div className="form-actions">
              <button type="submit">SALVAR ALUNO</button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/alunos")}
              >
                CANCELAR
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default AdicionarAluno;