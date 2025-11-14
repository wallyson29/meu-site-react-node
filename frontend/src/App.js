import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '' });

  // Busca usuários da API Node.js REAL
  const buscarUsuarios = async () => {
    try {
      setCarregando(true);
      setErro('');
      
      // USA BACKEND ONLINE NO RAILWAY
      const response = await axios.get('https://meu-backend-nodejs-production.up.railway.app/api/usuarios');
      
      setUsuarios(response.data);
      setCarregando(false);
    } catch (error) {
      console.error('Erro:', error);
      setErro('Erro ao carregar usuários do banco online');
      setCarregando(false);
    }
  };

  // Adiciona novo usuário
  const adicionarUsuario = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://meu-backend-nodejs-production.up.railway.app/api/usuarios', novoUsuario);
      setNovoUsuario({ nome: '', email: '' });
      buscarUsuarios(); // Recarrega a lista
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar usuário');
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

          {/* Formulário de cadastro */}
          <div className="cadastro-section">
            <h3>➕ Adicionar Novo Usuário</h3>
            <form onSubmit={adicionarUsuario} className="form-cadastro">
              <input
                type="text"
                placeholder="Nome completo"
                value={novoUsuario.nome}
                onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="E-mail"
                value={novoUsuario.email}
                onChange={(e) => setNovoUsuario({...novoUsuario, email: e.target.value})}
                required
              />
              <button type="submit">Cadastrar Usuário</button>
            </form>
          </div>

          {erro && (
            <div className="erro">
              <p>❌ {erro}</p>
              <p>💡 Verifique se o backend está online</p>
            </div>
          )}

          {carregando && !erro && (
            <p>⏳ Carregando usuários do banco online...</p>
          )}

          {!carregando && !erro && usuarios.length > 0 && (
            <div className="lista-usuarios">
              {usuarios.map(usuario => (
                <div key={usuario.id} className="card-usuario">
                  <h3>{usuario.nome}</h3>
                  <p>📧 {usuario.email}</p>
                  <p>ID: {usuario.id}</p>
                  <small>Criado em: {new Date(usuario.criado_em).toLocaleString('pt-BR')}</small>
                </div>
              ))}
            </div>
          )}

          {!carregando && !erro && usuarios.length === 0 && (
            <p>📭 Nenhum usuário encontrado no banco</p>
          )}
        </div>

        <div className="info">
          <p>✅ Backend Node.js: https://meu-backend-nodejs-production.up.railway.app</p>
          <p>✅ Frontend React: https://meu-site-react-node.vercel.app</p>
          <p>✅ Banco de Dados: Supabase PostgreSQL</p>
          <p>🎉 Sistema 100% Online e Funcionando!</p>
        </div>
      </header>
    </div>
  );
}

export default App;
