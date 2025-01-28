import fs from 'fs'
import { FornecedorService } from './../service/fornecedorService.js'
const fornec = new FornecedorService();
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const DB = process.env.DATABASE_URL;

mongoose
    .connect(DB)
    .then(() => console.log('Conexão com o MongoDB estabelecida com sucesso!'));

//Lendo json com fornecedores
const fornecedores = JSON.parse(
        fs.readFileSync('/app/data/fornecedores.json', 'utf-8')
      );

// importando no banco
const importData = async () => {
    try {
        await fornec.create(fornecedores);
        console.log('Dados carregados com suceso')
    } catch (err) {
        console.log(err.message)
    }
    process.exit(0);
}

//Removendo todos os fornecedores
const deleteFornec = async () => {
    try {
        await fornec.deleteMany();
        console.log('Dados apagados com suceso')
    } catch (err) {
        console.log(err.message)
    }
    process.exit(0);
}

// console.log(process.argv)
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete'){
    deleteFornec()
}