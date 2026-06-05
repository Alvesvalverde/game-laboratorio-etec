import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function JogoModo2() {
  const navigate = useNavigate();

  const desafiosPadrao = [
    {
      id: 1,
      enunciado: "Qual material está associado ao processo de filtração simples?",
      contexto: "Sistema experimental: Filtração simples",
      imagem: "/icons.svg",
      respostaCorreta: "Funil",
      dica: "Esse material é usado junto com papel filtro.",
      pontuacao: 15,
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
      pontuacao: 15,
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
      pontuacao: 15,
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

  const perguntasCadastradas =
    JSON.parse(localStorage.getItem("perguntasSistema")) || [];

  const desafiosDoProfessor = perguntasCadastradas
    .filter((pergunta) => String(pergunta.modo) === "2")
    .map((pergunta) => ({
      id: pergunta.id,
      enunciado: pergunta.enunciado,
      contexto: pergunta.tipoPergunta === "associacao"
        ? "Pergunta de associação"
        : "Sistema experimental",
      imagem: pergunta.imagem || "/icons.svg",
      respostaCorreta: pergunta.respostaCorreta,
      dica: pergunta.dica || "Sem dica cadastrada.",
      pontuacao: pergunta.pontuacao || 15,
      alternativas: pergunta.alternativas.map((alternativa) => alternativa.texto),
    }));

  const desafios = [...desafiosPadrao, ...desafiosDoProfessor];

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
      setPontuacao((valor) => valor + desafioAtual.pontuacao);
      setAcertos((valor) => valor + 1);
      setMensagem("Resposta correta! ✅");
    } else {
      setErros((valor) => valor + 1);
      setMensagem(`Resposta incorreta. A correta era: ${desafioAtual.respostaCorreta}`);
    }

    setBloqueado(true);
  }

  function salvarDesempenhoENavegar() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    const resultado = {
      id: Date.now(),
      alunoId: usuarioLogado?.id || 2,
      alunoNome: usuarioLogado?.nome || "Aluno Teste",
      modo: "Modo 2 - Médio",
      pontuacao,
      acertos,
      erros,
      totalPerguntas: desafios.length,
      data: new Date().toLocaleString("pt-BR"),
    };

    const historicoAtual =
      JSON.parse(localStorage.getItem("historicoDesempenho")) || [];

    localStorage.setItem(
      "historicoDesempenho",
      JSON.stringify([...historicoAtual, resultado])
    );

    navigate("/desempenho", {
      state: resultado,
    });
  }

  function proximoDesafio() {
    if (indiceAtual < desafios.length - 1) {
      setIndiceAtual((valor) => valor + 1);
      setMensagem("");
      setDicaVisivel(false);
      setBloqueado(false);
    } else {
      salvarDesempenhoENavegar();
    }
  }

  if (desafios.length === 0) {
    return (
      <>
        <Header />

        <main className="jogo2-page">
          <section className="jogo2-container">
            <div className="empty-performance">
              <h2>Nenhuma pergunta disponível</h2>
              <p>Peça ao professor para cadastrar perguntas neste modo.</p>

              <button
                className="primary-action-button"
                onClick={() => navigate("/aluno")}
              >
                Voltar ao menu
              </button>
            </div>
          </section>
        </main>
      </>
    );
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
              <div
                className={
                  mensagem.includes("correta")
                    ? "feedback success"
                    : "feedback error"
                }
              >
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
                {indiceAtual < desafios.length - 1
                  ? "Próximo desafio"
                  : "Finalizar"}
              </button>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default JogoModo2;