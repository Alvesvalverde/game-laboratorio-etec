import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MenuProfessor from "./pages/MenuProfessor";
import AdicionarPergunta from "./pages/AdicionarPergunta";
import MenuAluno from "./pages/MenuAluno";
import "./App.css";
import Ranking from "./pages/Ranking";
import ListaPerguntas from "./pages/ListaPerguntas";
import JogoModo1 from "./pages/JogoModo1";
import JogoModo2 from "./pages/JogoModo2";
import Desempenho from "./pages/Desempenho";
import GerenciarAlunos from "./pages/GerenciarAlunos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/professor" element={<MenuProfessor />} />
        <Route path="/aluno" element={<MenuAluno />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/alunos" element={<GerenciarAlunos />} />
        <Route path="/perguntas/:modo" element={<ListaPerguntas />} />
        <Route path="/jogo-modo-1" element={<JogoModo1 />} />
        <Route path="/jogo-modo-2" element={<JogoModo2 />} />
        <Route path="/desempenho" element={<Desempenho />} />

        <Route path="/adicionar-pergunta" element={<AdicionarPergunta />} />
        <Route path="/adicionar-pergunta/:modo" element={<AdicionarPergunta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;