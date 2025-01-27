import connectToDatabase from '../dao/db.js'
import dotenv from 'dotenv'
dotenv.config();
import app from '../app.js'

const PORT = process.env.PORT ?? 3333
const HOST = process.env.HOST || '127.0.0.1';

connectToDatabase();

app.listen({ host: HOST, port: PORT }, () => {
    console.log(`Ouvindo na porta ${PORT}`)
});