import React from 'react';
import './App.css'; // Vamos usar o mesmo CSS para manter o padrão 1920x1080

function MenuProfessor() {
  // Exemplo de dados que depois podem vir de um banco de dados
  const listaExemplo = Array(10).fill("xxx");

  return (
    <div className="page-container">
      {/* BACKGROUND COM BLUR (Mantendo o seu padrão) */}
      <div className="background-overlay"></div>

      {/* HEADER */}
      <header className="game-header">
        <div className="logo-container-mini">
          <img src="/Logo_etec.jpg" alt="ETEC Logo" />
        </div>
        <div className="menu-icon">☰</div>
      </header>

      <main className="menu-principal">
        <section className="cards-top">
          
          {/* RANKING */}
        {/* Linha 25: Card de Ranking */}
<div className="card-game ranking" onClick={() => alert("Abrir tela de ranking completo")}>
            <h2>👑 Ranking</h2>
            <ol>
              {listaExemplo.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>

          {/* PERFIL CENTRAL */}
          <div className="card-game perfil">
            <div className="avatar">👤</div>
            <p className="nome-perfil">NOME</p>
            <p className="cargo-perfil">Professor</p>
          </div>

          {/* LISTA DE ALUNOS */}
         <div className="card-game alunos" onClick={() => alert("Abrir lista completa de alunos")}>
            <h2>Lista de Alunos</h2>
            <ol>
              {listaExemplo.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>

        </section>

        {/* SEÇÃO DE BOTÕES */}
        <section className="buttons-group">
          <button className="btn-modo" onClick={() => alert('Iniciando Modo 1')}>
            Perguntas Modo 1
          </button>
          <button className="btn-modo" onClick={() => alert('Iniciando Modo 2')}>
            Perguntas Modo 2
          </button>
        </section>
      </main>
    </div>
  );
}

export default MenuProfessor;