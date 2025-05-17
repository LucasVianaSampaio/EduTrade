const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes.js');
const editoraRoutes = require('./src/routes/editoraRoutes.js')
const livroRoutes = require('./src/routes/livroRoutes.js')
const alunoRoutes = require('./src/routes/alunoRoutes.js')
const emprestimoRoutes = require('./src/routes/emprestimoRoutes.js')

const produtoRoutes = require('./src/routes/produtoRoutes.js');
const categoriaRoutes = require('./src/routes/categoriaRoutes.js');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/editoras', editoraRoutes);
app.use('/api/livros', livroRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/emprestimos', emprestimoRoutes);

app.use('/api/produtos', produtoRoutes);
app.use('/api/categorias', categoriaRoutes);


app.listen(8090, '0.0.0.0', () => {
    console.log('Servidor rodando na porta 8090');
});