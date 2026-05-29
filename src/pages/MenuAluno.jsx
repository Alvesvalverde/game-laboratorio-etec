import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function MenuAluno() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main className="aluno-page">
        <section className="aluno-hero">
          <div>
            <p className="aluno-subtitle">Área do Aluno</p>
            <h1>Bem-vindo ao Game Laboratório</h1>
            <p>
              Pratique a identificação de materiais e sistemas laboratoriais de
              forma interativa.
            </p>
          </div>

          <div className="aluno-profile-card">
            <div className="avatar">👤</div>
            <strong>Aluno Teste</strong>
            <span>1º Química A</span>
          </div>
        </section>

        <section className="aluno-actions">
          <button className="aluno-mode-card" onClick={() => navigate("/jogo-modo-1")}>
            <span className="mode-icon">🧪</span>
            <h2>Modo 1</h2>
            <p>Identificação básica de materiais de laboratório.</p>
            <strong>Fácil</strong>
          </button>

          <button className="aluno-mode-card" onClick={() => navigate("/jogo-modo-2")}>
            <span className="mode-icon">⚗️</span>
            <h2>Modo 2</h2>
            <p>Associação entre materiais, funções e sistemas experimentais.</p>
            <strong>Médio</strong>
          </button>

          <button className="aluno-info-card" onClick={() => navigate("/ranking")}>
            <span className="mode-icon">🏆</span>
            <h2>Ranking</h2>
            <p>Veja sua colocação entre os alunos.</p>
          </button>

          <button className="aluno-info-card" onClick={() => navigate("/desempenho")}>
            <span className="mode-icon">📊</span>
            <h2>Desempenho</h2>
            <p>Acompanhe seus acertos, erros e pontuação.</p>
          </button>
        </section>
      </main>
    </>
  );
}

export default MenuAluno;