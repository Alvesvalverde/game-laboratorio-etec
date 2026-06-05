import React from 'react';
import './App.css';

function AdicionarPergunta() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui no futuro você conectará com o backend ou salvará no estado global
    alert('Pergunta enviada com sucesso!');
  };

  return (
    <div className="page-container">
      {/* Background overlay para manter o padrão visual */}
      <div className="background-overlay"></div>

      <header className="game-header">
        <div className="logo-container-mini">
          {/* Referência à imagem Logo_etec.jpg presente na sua pasta public */}
          <img src="/Logo_etec.jpg" alt="ETEC Logo" />
        </div>
        <div className="menu-icon">☰</div>
      </header>

      <main className="main-content-center">
        <section className="card-game form-pergunta-card">
          <h2>ADICIONAR NOVA PERGUNTA</h2>

          <form id="formPergunta" onSubmit={handleSubmit}>
            <div className="form-input-group">
              <label>TÍTULO</label>
              <input type="text" placeholder="digite aqui..." required className="game-input" />
            </div>

            <div className="form-input-group">
              <label>IMAGEM</label>
              <input type="file" accept="image/*" className="game-input-file" />
            </div>

            <div className="form-input-group">
              <label>RESPOSTA CORRETA</label>
              <input type="text" placeholder="digite aqui..." required className="game-input" />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-modo">SALVAR PERGUNTA</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AdicionarPergunta;