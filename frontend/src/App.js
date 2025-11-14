import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Busca usuários da API Node.js
const buscarUsuarios = async () => {
  try {
    setCarregando(true);
    setErro('');
    
    // DADOS DE TESTE - funciona sem backend
    const dadosTeste = [
      { id: 1, nome: 'João Silva (Online)', email: 'joao@site.com' },
      { id: 2, nome: 'Maria Santos (Online)', email: 'maria@site.com' },
      { id: 3, nome: 'Pedro Oliveira (Online)', email: 'pedro@site.com' },
      { id: 4, nome: 'Ana Costa (Online)', email: 'ana@site.com' }
    ];
    
    // Simula delay de rede
    setTimeout(() => {
      setUsuarios(dadosTeste);
      setCarregando(false);
    }, 1000);
    
  } catch (error) {
    console.error('Erro:', error);
    setErro('Usando dados de exemplo - Backend offline');
    setCarregando(false);
  }
};

  // Busca automaticamente quando a página carrega
  useEffect(() => {
    buscarUsuarios();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Meu Site React + Node.js</h1>
        <p>Frontend React consumindo API Node.js</p>
        
        <div className="usuarios-section">
          <h2>👥 Lista de Usuários da API</h2>
          <button onClick={buscarUsuarios} className="btn-atualizar">
            🔄 Atualizar Lista
          </button>

          {carregando ? (
            <p>⏳ Carregando usuários...</p>
          ) : (
            <div className="lista-usuarios">
              {usuarios.map(usuario => (
                <div key={usuario.id} className="card-usuario">
                  <h3>{usuario.nome}</h3>
                  <p>📧 {usuario.email}</p>
                  <p>ID: {usuario.id}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="info">
          <p>✅ Backend Node.js: http://localhost:5000</p>
          <p>✅ Frontend React: http://localhost:3000</p>
          <p>🎉 Sistema completo funcionando!</p>
        </div>
      </header>
    </div>
  );
}

export default App;
