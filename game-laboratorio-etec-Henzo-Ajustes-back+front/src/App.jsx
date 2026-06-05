import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import MenuProfessor from "./pages/MenuProfessor";
import AdicionarPergunta from "./pages/AdicionarPergunta";
import MenuAluno from "./pages/MenuAluno";
import Ranking from "./pages/Ranking";
import ListaPerguntas from "./pages/ListaPerguntas";
import JogoModo1 from "./pages/JogoModo1";
import JogoModo2 from "./pages/JogoModo2";
import Desempenho from "./pages/Desempenho";
import GerenciarAlunos from "./pages/GerenciarAlunos";
import AdicionarAluno from "./pages/AdicionarAluno";
import DesempenhoAluno from "./pages/DesempenhoAluno";
import NotFound from "./pages/NotFound";
import "./App.css";
import RecuperarSenha from "./pages/RecuperarSenha";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="page-transition" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Login />} />
        <Route path="/professor" element={<MenuProfessor />} />
        <Route path="/aluno" element={<MenuAluno />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/alunos" element={<GerenciarAlunos />} />
        <Route path="/adicionar-aluno" element={<AdicionarAluno />} />
        <Route path="/perguntas/:modo" element={<ListaPerguntas />} />
        <Route path="/jogo-modo-1" element={<JogoModo1 />} />
        <Route path="/jogo-modo-2" element={<JogoModo2 />} />
        <Route path="/desempenho" element={<Desempenho />} />
        <Route path="/adicionar-pergunta" element={<AdicionarPergunta />} />
        <Route path="/adicionar-pergunta/:modo" element={<AdicionarPergunta />} />
        <Route path="/alunos/:id/desempenho" element={<DesempenhoAluno />} />
        <Route path="/editar-pergunta/:id" element={<AdicionarPergunta />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;