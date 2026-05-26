import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

function AdicionarPergunta() {
  const navigate = useNavigate();
  const { modo } = useParams();

  const [alternativaCorreta, setAlternativaCorreta] = useState("A");

  const modoInicial = modo === "2" ? "2" : "1";

  function salvarPergunta(event) {
    event.preventDefault();

    alert("Pergunta salva com sucesso!");

    navigate(`/perguntas/${modoInicial}`);
  }

  return (
    <>
      <Header />

      <main className="adicionar-page">
        <section className="add-question-container">
          <div className="page-title-row">
            <div>
              <p className="page-subtitle">Gerenciamento de perguntas</p>
              <h1>Adicionar Nova Pergunta</h1>
            </div>

            <button
              type="button"
              className="back-button"
              onClick={() => navigate(`/perguntas/${modoInicial}`)}
            >
              Voltar
            </button>
          </div>

          <form className="question-form-card" onSubmit={salvarPergunta}>
            <section className="form-section">
              <h2>Informações da pergunta</h2>

              <div className="form-grid">
                <div className="form-field">
                  <label>Modo de jogo</label>
                  <select defaultValue={modoInicial}>
                    <option value="1">Modo 1 - Fácil</option>
                    <option value="2">Modo 2 - Médio</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Tipo de pergunta</label>
                  <select defaultValue="multipla_escolha">
                    <option value="multipla_escolha">Múltipla escolha</option>
                    <option value="identificacao">Identificação</option>
                    <option value="associacao">Associação</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Pontuação</label>
                  <input type="number" defaultValue={modoInicial === "2" ? 15 : 10} min="1" />
                </div>

                <div className="form-field">
                  <label>Imagem</label>
                  <input type="file" accept="image/*" />
                </div>
              </div>

              <div className="form-field full-width">
                <label>Enunciado</label>
                <textarea
                  placeholder="Digite o enunciado da pergunta..."
                  required
                ></textarea>
              </div>
            </section>

            <section className="form-section">
              <h2>Alternativas</h2>

              <div className="alternatives-form-grid">
                <div className="alternative-form-item">
                  <label>Alternativa A</label>
                  <input type="text" placeholder="Digite a alternativa A" required />
                </div>

                <div className="alternative-form-item">
                  <label>Alternativa B</label>
                  <input type="text" placeholder="Digite a alternativa B" required />
                </div>

                <div className="alternative-form-item">
                  <label>Alternativa C</label>
                  <input type="text" placeholder="Digite a alternativa C" required />
                </div>

                <div className="alternative-form-item">
                  <label>Alternativa D</label>
                  <input type="text" placeholder="Digite a alternativa D" required />
                </div>
              </div>

              <div className="correct-answer-box">
                <label>Alternativa correta</label>

                <div className="correct-options">
                  {["A", "B", "C", "D"].map((letra) => (
                    <button
                      type="button"
                      key={letra}
                      className={
                        alternativaCorreta === letra
                          ? "correct-option active"
                          : "correct-option"
                      }
                      onClick={() => setAlternativaCorreta(letra)}
                    >
                      {letra}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Dica da pergunta</h2>

              <div className="form-field full-width">
                <label>Dica textual</label>
                <textarea
                  placeholder="Exemplo: esse material é usado junto com papel filtro..."
                ></textarea>
              </div>
            </section>

            <div className="form-actions">
              <button type="submit">SALVAR PERGUNTA</button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate(`/perguntas/${modoInicial}`)}
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

export default AdicionarPergunta;