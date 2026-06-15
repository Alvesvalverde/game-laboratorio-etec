import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function MenuProfessor() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main className="professor-dashboard-page">
        <section className="professor-hero">
          <div>
            <p className="professor-subtitle">Área do Professor</p>
            <h1>Bem-vindo ao Painel do Professor</h1>
            <p>
              Gerencie alunos, perguntas, ranking e desempenho dos estudantes no
              Game Laboratório.
            </p>
          </div>

          <div className="professor-profile-card">
            <div className="avatar">👤</div>
            <strong>Professor Teste</strong>
            <span>Professor</span>
          </div>
        </section>

        <section className="professor-actions">
          <button
            className="professor-action-card red-card"
            onClick={() => navigate("/ranking")}
          >
            <span className="professor-card-icon">🏆</span>
            <h2>Ranking</h2>
            <p>Veja a classificação dos alunos por pontuação acumulada.</p>
          </button>

          <button
            className="professor-action-card red-card"
            onClick={() => navigate("/alunos")}
          >
            <span className="professor-card-icon">👥</span>
            <h2>Gerenciar Alunos</h2>
            <p>Visualize, cadastre, remova e acompanhe os alunos do sistema.</p>
          </button>

          <button
            className="professor-action-card white-card"
            onClick={() => navigate("/desempenho")}
          >
            <span className="professor-card-icon">📊</span>
            <h2>Desempenho dos Alunos</h2>
            <p>Acesse o histórico geral de desempenho registrado nas partidas.</p>
          </button>

          <button
            className="professor-action-card white-card"
            onClick={() => navigate("/perguntas/1")}
          >
            <span className="professor-card-icon">🧪</span>
            <h2>Perguntas Modo 1</h2>
            <p>Gerencie perguntas de identificação básica de materiais.</p>
            <strong>Fácil</strong>
          </button>

          <button
            className="professor-action-card white-card"
            onClick={() => navigate("/perguntas/2")}
          >
            <span className="professor-card-icon">⚗️</span>
            <h2>Perguntas Modo 2</h2>
            <p>Gerencie perguntas de associação entre materiais e sistemas.</p>
            <strong>Médio</strong>
          </button>

          <button
            className="professor-action-card red-card"
            onClick={() => navigate("/adicionar-pergunta")}
          >
            <span className="professor-card-icon">➕</span>
            <h2>Adicionar Pergunta</h2>
            <p>Cadastre novas questões com alternativas, resposta correta e dica.</p>
          </button>
        </section>
      </main>
    </>
  );
}

export default MenuProfessor;