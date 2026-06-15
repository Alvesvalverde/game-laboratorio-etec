import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { api } from "../services/api";
import { getUsuarioLogado } from "../services/session";

function AdicionarPergunta() {
  const navigate = useNavigate();
  const { modo, id } = useParams();
  const estaEditando = Boolean(id);
  const modoInicial = modo === "2" ? "2" : "1";
  const [modoJogo, setModoJogo] = useState(modoInicial);
  const [tipoPergunta, setTipoPergunta] = useState("multipla_escolha");
  const [pontuacao, setPontuacao] = useState(modoInicial === "2" ? 15 : 10);
  const [enunciado, setEnunciado] = useState("");
  const [dica, setDica] = useState("");
  const [imagemBase64, setImagemBase64] = useState("");
  const [alternativas, setAlternativas] = useState({ A: "", B: "", C: "", D: "" });
  const [alternativaCorreta, setAlternativaCorreta] = useState("A");

  useEffect(() => {
    async function carregar() {
      if (!estaEditando) return;
      try {
        const p = await api.buscarPergunta(id);
        setModoJogo(String(p.modo));
        setTipoPergunta(p.tipoPergunta || "multipla_escolha");
        setPontuacao(p.pontuacao || 10);
        setEnunciado(p.enunciado || "");
        setDica(p.dica || "");
        setImagemBase64(p.imagem || "");
        const conv = { A: "", B: "", C: "", D: "" };
        p.alternativas?.forEach((a) => { conv[a.letra] = a.texto; });
        setAlternativas(conv);
        setAlternativaCorreta(p.alternativaCorreta || "A");
      } catch (error) { alert(error.message || "Pergunta não encontrada."); navigate("/professor"); }
    }
    carregar();
  }, [estaEditando, id, navigate]);

  function atualizarAlternativa(letra, valor) { setAlternativas((atual) => ({ ...atual, [letra]: valor })); }
  function carregarImagem(event) {
    const arquivo = event.target.files[0]; if (!arquivo) return;
    const leitor = new FileReader(); leitor.onload = () => setImagemBase64(leitor.result); leitor.readAsDataURL(arquivo);
  }

  async function salvarPergunta(event) {
    event.preventDefault();
    if (!enunciado.trim()) return alert("O enunciado da pergunta é obrigatório.");
    if (!alternativas.A.trim() || !alternativas.B.trim() || !alternativas.C.trim() || !alternativas.D.trim()) return alert("Todas as alternativas precisam ser preenchidas.");
    const usuario = getUsuarioLogado();
    const dados = { modo: modoJogo, tipoPergunta, enunciado, imagem: imagemBase64 || "/icons.svg", pontuacao: Number(pontuacao), dica, alternativas, alternativaCorreta, idProfessor: usuario?.id };
    try {
      if (estaEditando) await api.atualizarPergunta(id, dados); else await api.criarPergunta(dados);
      alert(estaEditando ? "Pergunta atualizada no banco!" : "Pergunta cadastrada no banco!");
      navigate(`/perguntas/${modoJogo}`);
    } catch (error) { alert(error.message || "Erro ao salvar pergunta."); }
  }

  return (
    <><Header /><main className="adicionar-page"><section className="add-question-container">
      <div className="page-title-row"><div><p className="page-subtitle">Gerenciamento de perguntas</p><h1>{estaEditando ? "Editar Pergunta" : "Adicionar Nova Pergunta"}</h1></div><button type="button" className="back-button" onClick={() => navigate(`/perguntas/${modoJogo}`)}>Voltar</button></div>
      <form className="question-form-card" onSubmit={salvarPergunta}>
        <section className="form-section"><h2>Informações da pergunta</h2><div className="form-grid">
          <div className="form-field"><label>Modo de jogo</label><select value={modoJogo} onChange={(e) => { setModoJogo(e.target.value); setPontuacao(e.target.value === "2" ? 15 : 10); }}><option value="1">Modo 1 - Fácil</option><option value="2">Modo 2 - Médio</option></select></div>
          <div className="form-field"><label>Tipo de pergunta</label><select value={tipoPergunta} onChange={(e) => setTipoPergunta(e.target.value)}><option value="multipla_escolha">Múltipla escolha</option><option value="identificacao">Identificação</option><option value="associacao">Associação</option></select></div>
          <div className="form-field"><label>Pontuação</label><input type="number" min="1" value={pontuacao} onChange={(e) => setPontuacao(e.target.value)} /></div>
        </div>
        <div className="form-field full-field"><label>Enunciado</label><textarea value={enunciado} onChange={(e) => setEnunciado(e.target.value)} placeholder="Digite o enunciado" required /></div>
        <div className="form-field full-field"><label>Dica</label><input type="text" value={dica} onChange={(e) => setDica(e.target.value)} placeholder="Digite uma dica" /></div>
        <div className="form-field full-field"><label>Imagem do enunciado</label><input type="file" accept="image/*" onChange={carregarImagem} />{imagemBase64 && <img src={imagemBase64} alt="Prévia" style={{maxWidth:160, marginTop:12}} />}</div>
        </section>
        <section className="form-section"><h2>Alternativas</h2><div className="alternatives-form-grid">{["A","B","C","D"].map((letra) => (<div className="form-field" key={letra}><label>Alternativa {letra}</label><input type="text" value={alternativas[letra]} onChange={(e) => atualizarAlternativa(letra, e.target.value)} required /><label className="radio-label"><input type="radio" name="correta" checked={alternativaCorreta===letra} onChange={() => setAlternativaCorreta(letra)} /> Correta</label></div>))}</div></section>
        <div className="form-actions"><button type="submit">{estaEditando ? "ATUALIZAR PERGUNTA" : "SALVAR PERGUNTA"}</button><button type="button" className="secondary-button" onClick={() => navigate(`/perguntas/${modoJogo}`)}>CANCELAR</button></div>
      </form>
    </section></main></>
  );
}
export default AdicionarPergunta;
