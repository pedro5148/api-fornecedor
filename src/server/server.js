//const connectToDatabase = require('../dao/db');
import connectToDatabase from '../dao/db.js'
//require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config();
//const app = require('../app')
import app from '../app.js'

const PORT = process.env.PORT ?? 3333
const HOST = process.env.HOST || '127.0.0.1';

connectToDatabase();

app.listen({ host: HOST, port: PORT }, () => {
    console.log(`Ouvindo na porta ${PORT}`)
});
