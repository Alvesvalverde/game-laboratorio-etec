import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function UserMenu() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) return null;
  
  // Tenta pegar do contexto, se for null, busca no localStorage
  const userFromContext = context.user;
  const userFromStorage = JSON.parse(localStorage.getItem("usuarioLogado"));
  const user = userFromContext || userFromStorage;

  const handleLogout = context.logout;

  // Verifica o tipo de usuário com base na fonte disponível
  const isProfessor = user?.tipo === 'professor' || user?.role === 'PROFESSOR';
  const buttonText = isProfessor ? "Desempenho geral" : "Meu desempenho geral";

  const handlePerformance = () => {
    if (isProfessor) {
      navigate('/painel-alunos');
    } else {
      navigate('/meu-desempenho');
    }
  };

  const handleLogoutClick = () => {
    if (handleLogout) handleLogout();
    localStorage.removeItem("usuarioLogado"); // Garante a limpeza
    navigate('/');
  };

  return (
    <div className="logout-menu">
      <button onClick={handlePerformance}>
        {buttonText}
      </button>
      <button onClick={handleLogoutClick}>
        Sair
      </button>
    </div>
  );
}

export default UserMenu;