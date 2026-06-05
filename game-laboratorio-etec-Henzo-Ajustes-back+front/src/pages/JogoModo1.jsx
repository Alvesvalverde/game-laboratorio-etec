import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function JogoModo1() {
  const navigate = useNavigate();

  const perguntasPadrao = [
    {
      id: 1,
      enunciado: "Qual é o nome deste material de laboratório?",
      imagem: "/icons.svg",
      respostaCorreta: "Béquer",
      dica: "É usado para misturar, aquecer ou armazenar líquidos.",
      pontuacao: 10,
      alternativas: ["Béquer", "Proveta", "Funil", "Pipeta"],
    },
    {
      id: 2,
      enunciado: "Qual material é utilizado para medir volume líquido?",
      imagem: "/icons.svg",
      respostaCorreta: "Proveta",
      dica: "Possui marcações laterais para medir volume.",
      pontuacao: 10,
      alternativas: ["Béquer", "Proveta", "Cápsula", "Condensador"],
    },
    {
      id: 3,
      enunciado: "Qual material é usado em filtração simples?",
      imagem: "/icons.svg",
      respostaCorreta: "Funil",
      dica: "É usado junto com papel filtro.",
      pontuacao: 10,
      alternativas: ["Bico de Bunsen", "Funil", "Almofariz", "Tela de amianto"],
    },
  ];

  const perguntasCadastradas =
    JSON.parse(localStorage.getItem("perguntasSistema")) || [];

  const perguntasDoProfessor = perguntasCadastradas
    .filter((pergunta) => String(pergunta.modo) === "1")
    .map((pergunta) => ({
      id: pergunta.id,
      enunciado: pergunta.enunciado,
      imagem: pergunta.imagem || "/icons.svg",
      respostaCorreta: pergunta.respostaCorreta,
      dica: pergunta.dica || "Sem dica cadastrada.",
      pontuacao: pergunta.pontuacao || 10,
      alternativas: pergunta.alternativas.map((alternativa) => alternativa.texto),
    }));

  const perguntas = [...perguntasPadrao, ...perguntasDoProfessor];

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [dicaVisivel, setDicaVisivel] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);

  const perguntaAtual = perguntas[indiceAtual];

  function responder(alternativa) {
    if (bloqueado) return;

    const acertou = alternativa === perguntaAtual.respostaCorreta;

    if (acertou) {
      setPontuacao((valor) => valor + perguntaAtual.pontuacao);
      setAcertos((valor) => valor + 1);
      setMensagem("Resposta correta! ✅");
    } else {
      setErros((valor) => valor + 1);
      setMensagem(`Resposta incorreta. A correta era: ${perguntaAtual.respostaCorreta}`);
    }

    setBloqueado(true);
  }

  function salvarDesempenhoENavegar() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    const resultado = {
      id: Date.now(),
      alunoId: usuarioLogado?.id || 2,
      alunoNome: usuarioLogado?.nome || "Aluno Teste",
      modo: "Modo 1 - Fácil",
      pontuacao,
      acertos,
      erros,
      totalPerguntas: perguntas.length,
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

  function proximaPergunta() {
    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual((valor) => valor + 1);
      setMensagem("");
      setDicaVisivel(false);
      setBloqueado(false);
    } else {
      salvarDesempenhoENavegar();
    }
  }

  if (perguntas.length === 0) {
    return (
      <>
        <Header />

        <main className="jogo-page">
          <section className="jogo-container">
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

      <main className="jogo-page">
        <section className="jogo-container">
          <div className="jogo-topbar">
            <div>
              <p className="page-subtitle">Modo 1 - Fácil</p>
              <h1>Identificação de Materiais</h1>
            </div>

            <div className="jogo-status">
              <div>
                <span>Pontuação</span>
                <strong>{pontuacao}</strong>
              </div>

              <div>
                <span>Pergunta</span>
                <strong>
                  {indiceAtual + 1}/{perguntas.length}
                </strong>
              </div>
            </div>
          </div>

          <section className="jogo-card">
            <div className="jogo-question-area">
              <div className="question-image-box">
                <img src={perguntaAtual.imagem} alt="Material de laboratório" />
              </div>

              <div className="question-text-box">
                <h2>{perguntaAtual.enunciado}</h2>

                <p>
                  Observe a imagem e selecione a alternativa que corresponde ao
                  material apresentado.
                </p>

                <button
                  type="button"
                  className="hint-button"
                  onClick={() => setDicaVisivel(true)}
                >
                  💡 Usar dica
                </button>

                {dicaVisivel && (
                  <div className="hint-box">
                    <strong>Dica:</strong> {perguntaAtual.dica}
                  </div>
                )}
              </div>
            </div>

            <div className="alternatives-grid">
              {perguntaAtual.alternativas.map((alternativa) => (
                <button
                  key={alternativa}
                  className="alternative-button"
                  onClick={() => responder(alternativa)}
                  disabled={bloqueado}
                >
                  {alternativa}
                </button>
              ))}
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
                onClick={proximaPergunta}
                disabled={!bloqueado}
              >
                {indiceAtual < perguntas.length - 1
                  ? "Próxima pergunta"
                  : "Finalizar"}
              </button>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default JogoModo1;