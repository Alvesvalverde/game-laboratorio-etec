
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao acessar o servidor.");
  }

  return data;
}

export const api = {
  login: (email, senha) => request("/auth/login", { method: "POST", body: JSON.stringify({ email, senha }) }),
  verificarEmail: (email) => request(`/usuarios/existe?email=${encodeURIComponent(email)}`),
  listarAlunos: () => request("/alunos"),
  criarAluno: (aluno) => request("/alunos", { method: "POST", body: JSON.stringify(aluno) }),
  removerAluno: (id) => request(`/alunos/${id}`, { method: "DELETE" }),
  listarPerguntas: (modo) => request(`/perguntas${modo ? `?modo=${modo}` : ""}`),
  buscarPergunta: (id) => request(`/perguntas/${id}`),
  criarPergunta: (pergunta) => request("/perguntas", { method: "POST", body: JSON.stringify(pergunta) }),
  atualizarPergunta: (id, pergunta) => request(`/perguntas/${id}`, { method: "PUT", body: JSON.stringify(pergunta) }),
  removerPergunta: (id) => request(`/perguntas/${id}`, { method: "DELETE" }),
  salvarPartida: (partida) => request("/partidas", { method: "POST", body: JSON.stringify(partida) }),
  desempenho: (alunoId) => request(`/desempenho${alunoId ? `?alunoId=${alunoId}` : ""}`),
  desempenhoAluno: (id) => request(`/alunos/${id}/desempenho`),
  ranking: () => request("/ranking"),
};
