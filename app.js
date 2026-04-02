// Importação de Libs

const express = require('express');
const path = require('path');
const Func = require('./routes/func');
const { Login } = require('./routes/actions');

// Configiração do servidor
const app = express()
const PORT = 4000
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


// Rota de carregamento das Cards "Cmo funciona"
app.get("/func", Func);

// Rota de Login
app.post('/actions/login', Login);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log('Conectando', '.'.repeat(40));
  console.log('•'.repeat(50));
  console.log('Servidor Inicializado! ', '✓'.repeat(27));
  console.log('Acessivel em http://localhost:4000');
  
})
