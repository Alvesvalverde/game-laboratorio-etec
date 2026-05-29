import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function JogoModo2() {
  const navigate = useNavigate();

  const desafios = [
    {
      id: 1,
      enunciado: "Qual material está associado ao processo de filtração simples?",
      contexto: "Sistema experimental: Filtração simples",
      imagem: "/icons.svg",
      respostaCorreta: "Funil",
      dica: "Esse material é usado junto com papel filtro.",
      alternativas: [
        "Funil",
        "Bico de Bunsen",
        "Condensador",
        "Almofariz",
        "Pipeta",
        "Béquer",
        "Proveta",
        "Cápsula",
        "Tripé",
      ],
    },
    {
      id: 2,
      enunciado: "Qual material é utilizado para condensar vapores em uma destilação?",
      contexto: "Sistema experimental: Destilação simples",
      imagem: "/icons.svg",
      respostaCorreta: "Condensador",
      dica: "Esse material resfria o vapor e transforma em líquido novamente.",
      alternativas: [
        "Proveta",
        "Funil",
        "Condensador",
        "Pipeta",
        "Bastão de vidro",
        "Béquer",
        "Almofariz",
        "Cápsula",
        "Tela de amianto",
      ],
    },
    {
      id: 3,
      enunciado: "Qual material é mais adequado para secagem de pequenas quantidades de sólido?",
      contexto: "Função: Secagem de sólidos",
      imagem: "/icons.svg",
      respostaCorreta: "Cápsula",
      dica: "Normalmente é feita de porcelana.",
      alternativas: [
        "Béquer",
        "Proveta",
        "Funil",
        "Condensador",
        "Pipeta",
        "Cápsula",
        "Bico de Bunsen",
        "Erlenmeyer",
        "Almofariz",
      ],
    },
  ];

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [dicaVisivel, setDicaVisivel] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);

  const desafioAtual = desafios[indiceAtual];

  function responder(alternativa) {
    if (bloqueado) return;

    const acertou = alternativa === desafioAtual.respostaCorreta;

    if (acertou) {
      setPontuacao((valor) => valor + 15);
      setAcertos((valor) => valor + 1);
      setMensagem("Resposta correta! ✅");
    } else {
      setErros((valor) => valor + 1);
      setMensagem(`Resposta incorreta. A correta era: ${desafioAtual.respostaCorreta}`);
    }

    setBloqueado(true);
  }

  function proximoDesafio() {
    if (indiceAtual < desafios.length - 1) {
      setIndiceAtual((valor) => valor + 1);
      setMensagem("");
      setDicaVisivel(false);
      setBloqueado(false);
    } else {
      navigate("/desempenho", {
        state: {
          modo: "Modo 2 - Médio",
          pontuacao,
          acertos,
          erros,
          totalPerguntas: desafios.length,
        },
      });
    }
  }

  return (
    <>
      <Header />

      <main className="jogo2-page">
        <section className="jogo2-container">
          <div className="jogo-topbar">
            <div>
              <p className="page-subtitle">Modo 2 - Médio</p>
              <h1>Associação de Materiais e Sistemas</h1>
            </div>

            <div className="jogo-status">
              <div>
                <span>Pontuação</span>
                <strong>{pontuacao}</strong>
              </div>

              <div>
                <span>Desafio</span>
                <strong>
                  {indiceAtual + 1}/{desafios.length}
                </strong>
              </div>
            </div>
          </div>

          <section className="jogo2-card">
            <div className="jogo2-main-area">
              <div className="jogo2-context-box">
                <div className="context-icon">⚗️</div>

                <p className="context-label">Contexto do desafio</p>
                <h2>{desafioAtual.contexto}</h2>

                <div className="context-image">
                  <img src={desafioAtual.imagem} alt="Sistema experimental" />
                </div>

                <p className="context-question">{desafioAtual.enunciado}</p>

                <button
                  type="button"
                  className="hint-button"
                  onClick={() => setDicaVisivel(true)}
                >
                  💡 Usar dica
                </button>

                {dicaVisivel && (
                  <div className="hint-box">
                    <strong>Dica:</strong> {desafioAtual.dica}
                  </div>
                )}
              </div>

              <div className="jogo2-options-box">
                <h3>Escolha a alternativa correta</h3>

                <div className="jogo2-options-grid">
                  {desafioAtual.alternativas.map((alternativa) => (
                    <button
                      key={alternativa}
                      className="jogo2-option"
                      onClick={() => responder(alternativa)}
                      disabled={bloqueado}
                    >
                      {alternativa}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {mensagem && (
              <div className={mensagem.includes("correta") ? "feedback success" : "feedback error"}>
                {mensagem}
              </div>
            )}

            <div className="jogo-actions">
              <button className="back-button" onClick={() => navigate("/aluno")}>
                Sair
              </button>

              <button
                className="primary-action-button"
                onClick={proximoDesafio}
                disabled={!bloqueado}
              >
                {indiceAtual < desafios.length - 1 ? "Próximo desafio" : "Finalizar"}
              </button>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default JogoModo2;