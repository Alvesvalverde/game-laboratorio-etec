import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { api } from "../services/api";
import { getUsuarioLogado } from "../services/session";

function JogoModo2() {
  const navigate = useNavigate();

  const [perguntas, setPerguntas] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [dicaVisivel, setDicaVisivel] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);

  useEffect(() => {
    async function carregarPerguntas() {
      try {
        const dados = await api.listarPerguntas("2");

        const perguntasFormatadas = dados.map((pergunta) => ({
          ...pergunta,
          imagem: pergunta.imagem || pergunta.imagem_url || "",
          respostaCorreta:
            pergunta.respostaCorreta ||
            pergunta.resposta_correta ||
            pergunta.resposta_correta_texto ||
            "",
          alternativas:
            pergunta.alternativas?.map((alternativa) => {
              if (typeof alternativa === "string") {
                return alternativa;
              }

              return alternativa.texto;
            }) || [],
        }));

        setPerguntas(perguntasFormatadas);
      } catch (erro) {
        alert(erro.message || "Erro ao carregar perguntas.");
      }
    }

    carregarPerguntas();
  }, []);

  const perguntaAtual = perguntas[indiceAtual];

  function responder(alternativa) {
    if (bloqueado || !perguntaAtual) return;

    const acertou = alternativa === perguntaAtual.respostaCorreta;

    if (acertou) {
      setPontuacao((valorAtual) => valorAtual + perguntaAtual.pontuacao);
      setAcertos((valorAtual) => valorAtual + 1);
      setMensagem("Resposta correta! ✅");
      setTipoMensagem("success");
    } else {
      setErros((valorAtual) => valorAtual + 1);
      setMensagem(`Resposta incorreta. A correta era: ${perguntaAtual.respostaCorreta}`);
      setTipoMensagem("error");
    }

    setBloqueado(true);
  }

  async function salvarDesempenhoENavegar() {
    const usuario = getUsuarioLogado();

    const resultado = {
      alunoId: usuario?.id,
      alunoNome: usuario?.nome,
      modo: "2",
      pontuacao,
      acertos,
      erros,
      totalPerguntas: perguntas.length,
    };

    try {
      if (usuario?.id) {
        await api.salvarPartida(resultado);
      }
    } catch (erro) {
      alert(erro.message || "Erro ao salvar desempenho no banco.");
    }

    navigate("/desempenho", {
      state: {
        ...resultado,
        modo: "Modo 2 - Médio",
        data: new Date().toLocaleString("pt-BR"),
      },
    });
  }

  function proximaPergunta() {
    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual((valorAtual) => valorAtual + 1);
      setMensagem("");
      setTipoMensagem("");
      setDicaVisivel(false);
      setBloqueado(false);
      return;
    }

    salvarDesempenhoENavegar();
  }

  if (!perguntaAtual) {
    return (
      <>
        <Header />

        <main className="jogo2-page">
          <section className="jogo-container">
            <div className="empty-performance">
              <h2>Nenhuma pergunta disponível</h2>
              <p>Cadastre perguntas no banco de dados.</p>

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
        <section className="jogo-container">
          <div className="jogo-topbar">
            <div>
              <p className="page-subtitle">Modo 2</p>
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
                  {indiceAtual + 1}/{perguntas.length}
                </strong>
              </div>
            </div>
          </div>

          <section className="jogo2-card">
            <div className="jogo-question-area">
              {perguntaAtual.imagem ? (
                <div className="question-image-box">
                  <img
                    src={perguntaAtual.imagem}
                    alt="Imagem da pergunta"
                  />
                </div>
              ) : (
                <div className="question-image-box">
                  <span>Sem imagem cadastrada</span>
                </div>
              )}

              <div className="question-text-box">
                <h2>{perguntaAtual.enunciado}</h2>
                <p>Selecione a alternativa correta.</p>

                {perguntaAtual.dica && (
                  <>
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
                  </>
                )}
              </div>
            </div>

            <div className="alternatives-grid">
              {perguntaAtual.alternativas.map((alternativa, index) => (
                <button
                  key={`${alternativa}-${index}`}
                  className="alternative-button"
                  onClick={() => responder(alternativa)}
                  disabled={bloqueado}
                >
                  {alternativa}
                </button>
              ))}
            </div>

            {mensagem && (
              <div className={`feedback ${tipoMensagem}`}>
                {mensagem}
              </div>
            )}

            <div className="jogo-actions">
              <button
                className="back-button"
                onClick={() => navigate("/aluno")}
              >
                Sair
              </button>

              <button
                className="primary-action-button"
                onClick={proximaPergunta}
                disabled={!bloqueado}
              >
                {indiceAtual < perguntas.length - 1 ? "Próxima" : "Finalizar"}
              </button>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default JogoModo2;