//const express = require('express')
import express from 'express'
const app = express()
//const morgan = require('morgan')
import morgan from 'morgan'

//Rota/Controller
import fornecRoute from './routes/fornecRoutes.js';

//Middleware
app.use(morgan('dev')) //retorna o cabecalho das requisicoes
app.use(express.json()) // Content-Type: application/json
app.use((req, res, next) => {
    //req.requestTime = new Date().toISOString(); //retorna o horario da req
    req.requestTime = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    next();
});

//Rotas
app.use('/api/v1/fornecedores', fornecRoute)
app.get('/', (req, res) => {
    res.send(`
        <h1>API de Fornecedores</h1>
        <p>Esta API permite o gerenciamento de fornecedores. As rotas disponíveis são:</p>
        <ul>
            <li>/api/v1/fornecedores - GET (listar fornecedores)</li>
            <li>/api/v1/fornecedores/:id - GET (buscar fornecedor por ID)</li>
            <li>/api/v1/fornecedores - POST (criar fornecedor)</li>
            <li>/api/v1/fornecedores/:id - PATCH (atualizar fornecedor)</li>
            <li>/api/v1/fornecedores/:id - DELETE (deletar fornecedor)</li>
        </ul>
    `);
  });

//module.exports = app;
export default app;