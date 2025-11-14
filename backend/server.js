const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'MEU PRIMEIRO BACKEND NODE.JS!',
    data: new Date().toLocaleString('pt-BR')
  });
});

// Rota com dados de exemplo
app.get('/api/usuarios', (req, res) => {
  const usuarios = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com' },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com' },
    { id: 3, nome: 'Pedro Oliveira', email: 'pedro@email.com' }
  ];
  res.json(usuarios);
});

// Rota que recebe dados do formulário
app.post('/api/contato', (req, res) => {
  const { nome, email, mensagem } = req.body;
  console.log('Mensagem recebida:', { nome, email, mensagem });
  res.json({ 
    success: true, 
    message: 'Obrigado ' + nome + '! Sua mensagem foi recebida.'
  });
});

// Inicia o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log('=================================');
  console.log('SERVER NODE.JS INICIADO!');
  console.log('=================================');
  console.log('URL: http://localhost:' + PORT);
  console.log('API: http://localhost:' + PORT + '/api/usuarios');
  console.log('Para parar: Ctrl + C');
  console.log('=================================');
});