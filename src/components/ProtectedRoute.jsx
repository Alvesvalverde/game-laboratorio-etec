import { Navigate } from "react-router-dom";
import { getUsuarioLogado } from "../services/session";

function ProtectedRoute({ children, allowedTypes }) {
  const usuario = getUsuarioLogado();

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  if (allowedTypes && !allowedTypes.includes(usuario.tipo)) {
    if (usuario.tipo === "professor") {
      return <Navigate to="/professor" replace />;
    }

    if (usuario.tipo === "aluno") {
      return <Navigate to="/aluno" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;