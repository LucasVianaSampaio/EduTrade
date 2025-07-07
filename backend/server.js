const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes.js');

const produtoRoutes = require('./src/routes/produtoRoutes.js');
const categoriaRoutes = require('./src/routes/categoriaRoutes.js');
const carrinhoRoutes = require('./src/routes/carrinhoRoutes.js');
const pedidoRoutes = require('./src/routes/pedidoRoutes.js');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/users', userRoutes);

app.use('/api/produtos', produtoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/carrinho', carrinhoRoutes);
app.use('/api/pedidos', pedidoRoutes);


app.listen(8090, '0.0.0.0', () => {
    console.log('Servidor rodando na porta 8090');
});