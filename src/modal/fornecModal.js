//const mongoose = require('mongoose');
import mongoose from 'mongoose'

//Schema
const fornecSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Um fornecedor deve ter um nome'],
        trim: true //remove espacos em branco no inicio e fim
    },
    cnpj: {
        type: String,
        required: [true, 'Informe um CNPJ valido'],
        unique: true
    },
    telefone: String,
    email: {
        type: String,
        validate: {
            validator: function (v) {
                // Valida formato de email
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: 'Informe um email válido!',
        },
    },
    endereco: {
        type: String,
    },
    produtos: {
        type: [String], 
    },
    status: {
        type: String,
        default: 'ativo',
        enum: ['ativo','inativo'],
    },
})

// Definindo o modelo 
const Fornec = mongoose.model('fornecedores', fornecSchema);

// const testeFornec = new Fornec({
//     nome: "Requinte 3",
//     cnpj: "10.641.901/0001-16",
//     telefone: "62 99999-9999",
//     email: "contato@r3suprimentos.com",
//     endereco: "Av Sao Francisco, 822, Goiania, GO, 01000-000",
//     produtos: [
//       "Produto A",
//       "Produto B"
//     ],
//     status: "ativo"
// }); 

// testeFornec.save().then(doc => {
//     console.log(doc)
// }).catch(err => {
//     console.log("Erro ao inserir:", err)
// })

//module.exports = Fornec;
export default Fornec;