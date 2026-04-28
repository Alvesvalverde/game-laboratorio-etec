import React from 'react'
import './App.css'

function App() {
  return (
    <div className="page-container">
      {/* O fundo com blur fica aqui dentro */}
      <div className="background-overlay"></div>

      <div className="logo-container">
        {/* CORRIGIDO ABAIXO: Adicionada a tag img */}
        <img src="/Logo_etec.jpg" alt="Etec Logo" />
      </div>

      <div className="main-card">
        <div className="side-left">
          <h2>Bem Vindo de volta!</h2>
          <p>Acesse sua conta</p>
          <button className="btn-outline">ENTRAR</button>
        </div>

        <div className="side-right">
          <h2>Criar sua conta</h2>
          <div className="form-group">
            <input type="text" placeholder="NOME" />
            <input type="email" placeholder="EMAIL" />
            <input type="password" placeholder="SENHA" />
            <button className="btn-submit">ENVIAR</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App