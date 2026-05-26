import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function MenuProfessor() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main className="professor-page">
        <section className="cards-top">
        <div className="card ranking-card" onClick={() => navigate("/ranking")}>
            <h2>👑 Ranking</h2>

            <ol>
              <li>Aluno 1 — 100 pts</li>
              <li>Aluno 2 — 90 pts</li>
              <li>Aluno 3 — 80 pts</li>
              <li>Aluno 4 — 70 pts</li>
              <li>Aluno 5 — 60 pts</li>
              <li>Aluno 6 — 50 pts</li>
              <li>Aluno 7 — 40 pts</li>
              <li>Aluno 8 — 30 pts</li>
              <li>Aluno 9 — 20 pts</li>
              <li>Aluno 10 — 10 pts</li>
            </ol>
          </div>

          <div className="card perfil-card">
            <div className="avatar">👤</div>
            <p className="nome">Professor Teste</p>
            <p className="cargo">Professor</p>
          </div>

          <div className="card alunos-card" onClick={() => navigate("/alunos")}>
            <h2>Lista de Alunos</h2>

            <ol>
              <li>Aluno A</li>
              <li>Aluno B</li>
              <li>Aluno C</li>
              <li>Aluno D</li>
              <li>Aluno E</li>
              <li>Aluno F</li>
              <li>Aluno G</li>
              <li>Aluno H</li>
              <li>Aluno I</li>
              <li>Aluno J</li>
            </ol>
          </div>
        </section>

        <section className="buttons-area">
        <button onClick={() => navigate("/perguntas/1")}>
          Perguntas Modo 1
        </button>

        <button onClick={() => navigate("/perguntas/2")}>
          Perguntas Modo 2
        </button>
        </section>
      </main>
    </>
  );
}

export default MenuProfessor;