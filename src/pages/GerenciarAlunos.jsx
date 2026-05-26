import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function GerenciarAlunos() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState("");

  const alunos = [
    {
      id: 1,
      nome: "Aluno A",
      email: "alunoa@etec.com",
      turma: "1º Química A",
      pontos: 120,
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Aluno B",
      email: "alunob@etec.com",
      turma: "1º Química A",
      pontos: 90,
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Aluno C",
      email: "alunoc@etec.com",
      turma: "1º Química A",
      pontos: 70,
      status: "Ativo",
    },
    {
      id: 4,
      nome: "Aluno D",
      email: "alunod@etec.com",
      turma: "1º Química A",
      pontos: 50,
      status: "Ativo",
    },
    {
      id: 5,
      nome: "Aluno E",
      email: "alunoe@etec.com",
      turma: "1º Química A",
      pontos: 30,
      status: "Ativo",
    },
  ];

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <Header />

      <main className="alunos-page">
        <section className="alunos-container">
          <div className="page-title-row">
            <div>
              <p className="page-subtitle">Área do professor</p>
              <h1>Gerenciamento de Alunos</h1>
            </div>

            <div className="page-actions">
              <button className="back-button" onClick={() => navigate("/professor")}>
                Voltar
              </button>

              <button className="primary-action-button">
                + Adicionar Aluno
              </button>
            </div>
          </div>

          <section className="alunos-summary">
            <div className="summary-card">
              <strong>{alunos.length}</strong>
              <span>Alunos cadastrados</span>
            </div>

            <div className="summary-card">
              <strong>{alunos.filter((aluno) => aluno.status === "Ativo").length}</strong>
              <span>Alunos ativos</span>
            </div>

            <div className="summary-card">
              <strong>1º Química A</strong>
              <span>Turma principal</span>
            </div>
          </section>

          <section className="alunos-tools">
            <input
              type="text"
              placeholder="Pesquisar aluno pelo nome..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
          </section>

          <section className="alunos-table-card">
            <table className="alunos-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Turma</th>
                  <th>Pontuação</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {alunosFiltrados.map((aluno) => (
                  <tr key={aluno.id}>
                    <td>#{aluno.id}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.email}</td>
                    <td>{aluno.turma}</td>
                    <td>{aluno.pontos} pts</td>
                    <td>
                      <span className="status-badge">{aluno.status}</span>
                    </td>
                    <td>
                      <button className="table-action-button">Ver</button>
                      <button className="table-action-button danger">Remover</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {alunosFiltrados.length === 0 && (
              <p className="empty-message">Nenhum aluno encontrado.</p>
            )}
          </section>
        </section>
      </main>
    </>
  );
}

export default GerenciarAlunos;