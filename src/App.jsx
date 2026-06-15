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
import RecuperarSenha from "./pages/RecuperarSenha";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="page-transition" key={location.pathname}>
      <Routes location={location}>
        {/* Rotas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />

        {/* Rotas do professor */}
        <Route
          path="/professor"
          element={
            <ProtectedRoute allowedTypes={["professor"]}>
              <MenuProfessor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alunos"
          element={
            <ProtectedRoute allowedTypes={["professor"]}>
              <GerenciarAlunos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adicionar-aluno"
          element={
            <ProtectedRoute allowedTypes={["professor"]}>
              <AdicionarAluno />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perguntas/:modo"
          element={
            <ProtectedRoute allowedTypes={["professor"]}>
              <ListaPerguntas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adicionar-pergunta"
          element={
            <ProtectedRoute allowedTypes={["professor"]}>
              <AdicionarPergunta />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adicionar-pergunta/:modo"
          element={
            <ProtectedRoute allowedTypes={["professor"]}>
              <AdicionarPergunta />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editar-pergunta/:id"
          element={
            <ProtectedRoute allowedTypes={["professor"]}>
              <AdicionarPergunta />
            </ProtectedRoute>
          }
        />

        {/* Rotas do aluno */}
        <Route
          path="/aluno"
          element={
            <ProtectedRoute allowedTypes={["aluno"]}>
              <MenuAluno />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jogo-modo-1"
          element={
            <ProtectedRoute allowedTypes={["aluno"]}>
              <JogoModo1 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jogo-modo-2"
          element={
            <ProtectedRoute allowedTypes={["aluno"]}>
              <JogoModo2 />
            </ProtectedRoute>
          }
        />

        {/* Rotas compartilhadas entre aluno e professor */}
        <Route
          path="/ranking"
          element={
            <ProtectedRoute allowedTypes={["aluno", "professor"]}>
              <Ranking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/desempenho"
          element={
            <ProtectedRoute allowedTypes={["aluno", "professor"]}>
              <Desempenho />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alunos/:id/desempenho"
          element={
            <ProtectedRoute allowedTypes={["aluno", "professor"]}>
              <DesempenhoAluno />
            </ProtectedRoute>
          }
        />

        {/* Página não encontrada */}
        <Route path="*" element={<NotFound />} />
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