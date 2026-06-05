import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

function AdicionarPergunta() {
  const navigate = useNavigate();
  const { modo } = useParams();

  const modoInicial = modo === "2" ? "2" : "1";

  const [modoJogo, setModoJogo] = useState(modoInicial);
  const [tipoPergunta, setTipoPergunta] = useState("multipla_escolha");
  const [pontuacao, setPontuacao] = useState(modoInicial === "2" ? 15 : 10);
  const [enunciado, setEnunciado] = useState("");
  const [dica, setDica] = useState("");
  const [imagemBase64, setImagemBase64] = useState("");

  const [alternativas, setAlternativas] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
  });

  const [alternativaCorreta, setAlternativaCorreta] = useState("A");

  function atualizarAlternativa(letra, valor) {
    setAlternativas((estadoAtual) => ({
      ...estadoAtual,
      [letra]: valor,
    }));
  }

  function carregarImagem(event) {
    const arquivo = event.target.files[0];

    if (!arquivo) {
      setImagemBase64("");
      return;
    }

    const leitor = new FileReader();

    leitor.onload = () => {
      setImagemBase64(leitor.result);
    };

    leitor.readAsDataURL(arquivo);
  }

  function salvarPergunta(event) {
    event.preventDefault();

    const perguntasSalvas =
      JSON.parse(localStorage.getItem("perguntasSistema")) || [];

    const novaPergunta = {
      id: Date.now(),
      modo: modoJogo,
      modoTexto: modoJogo === "2" ? "Modo 2 - Médio" : "Modo 1 - Fácil",
      tipoPergunta,
      enunciado,
      imagem: imagemBase64 || "/icons.svg",
      pontuacao: Number(pontuacao),
      dica,
      respostaCorreta: alternativas[alternativaCorreta],
      alternativaCorreta,
      alternativas: [
        {
          letra: "A",
          texto: alternativas.A,
          correta: alternativaCorreta === "A",
        },
        {
          letra: "B",
          texto: alternativas.B,
          correta: alternativaCorreta === "B",
        },
        {
          letra: "C",
          texto: alternativas.C,
          correta: alternativaCorreta === "C",
        },
        {
          letra: "D",
          texto: alternativas.D,
          correta: alternativaCorreta === "D",
        },
      ],
      status: "Ativa",
      dataCriacao: new Date().toLocaleString("pt-BR"),
    };

    localStorage.setItem(
      "perguntasSistema",
      JSON.stringify([...perguntasSalvas, novaPergunta])
    );

    alert("Pergunta cadastrada com sucesso!");
    navigate(`/perguntas/${modoJogo}`);
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
                  <select
                    value={modoJogo}
                    onChange={(event) => {
                      setModoJogo(event.target.value);
                      setPontuacao(event.target.value === "2" ? 15 : 10);
                    }}
                  >
                    <option value="1">Modo 1 - Fácil</option>
                    <option value="2">Modo 2 - Médio</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Tipo de pergunta</label>
                  <select
                    value={tipoPergunta}
                    onChange={(event) => setTipoPergunta(event.target.value)}
                  >
                    <option value="multipla_escolha">Múltipla escolha</option>
                    <option value="identificacao">Identificação</option>
                    <option value="associacao">Associação</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Pontuação</label>
                  <input
                    type="number"
                    min="1"
                    value={pontuacao}
                    onChange={(event) => setPontuacao(event.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Imagem</label>
                  <input type="file" accept="image/*" onChange={carregarImagem} />
                </div>
              </div>

              <div className="form-field full-width">
                <label>Enunciado</label>
                <textarea
                  placeholder="Digite o enunciado da pergunta..."
                  value={enunciado}
                  onChange={(event) => setEnunciado(event.target.value)}
                  required
                ></textarea>
              </div>
            </section>

            <section className="form-section">
              <h2>Alternativas</h2>

              <div className="alternatives-form-grid">
                <div className="alternative-form-item">
                  <label>Alternativa A</label>
                  <input
                    type="text"
                    placeholder="Digite a alternativa A"
                    value={alternativas.A}
                    onChange={(event) =>
                      atualizarAlternativa("A", event.target.value)
                    }
                    required
                  />
                </div>

                <div className="alternative-form-item">
                  <label>Alternativa B</label>
                  <input
                    type="text"
                    placeholder="Digite a alternativa B"
                    value={alternativas.B}
                    onChange={(event) =>
                      atualizarAlternativa("B", event.target.value)
                    }
                    required
                  />
                </div>

                <div className="alternative-form-item">
                  <label>Alternativa C</label>
                  <input
                    type="text"
                    placeholder="Digite a alternativa C"
                    value={alternativas.C}
                    onChange={(event) =>
                      atualizarAlternativa("C", event.target.value)
                    }
                    required
                  />
                </div>

                <div className="alternative-form-item">
                  <label>Alternativa D</label>
                  <input
                    type="text"
                    placeholder="Digite a alternativa D"
                    value={alternativas.D}
                    onChange={(event) =>
                      atualizarAlternativa("D", event.target.value)
                    }
                    required
                  />
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
                  value={dica}
                  onChange={(event) => setDica(event.target.value)}
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