//const mongoose = require('mongoose');
import mongoose from 'mongoose'
import slugify from 'slugify'

//Schema
const fornecSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Um fornecedor deve ter um nome'],
        trim: true //remove espacos em branco no inicio e fim
    },
    nomeLower: String,
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
    dataCriacao: {
        type: Date,
        default: Date.now(),
        select: false
    },
    privado: {
        type: Boolean,
        default: false
    }
},
{
    toJSON: { virtuals: true }, // virtuals parte da response em JSON
    toObject: { virtuals: true } // sera um objeto
}

)

/*Propriedades virtuais = permite adicionar campos na response sem necessariamente existir no BD
Nao pode ser usado em consulta pois nao é parte do BD

duration nao existe no schema

*/

fornecSchema.virtual('duracaoSemana').get(function() {
    return this.duration / 7;
})

/*
Document Middlware, permite manipular a informacao antes dela ser salva
executa antes do .save() e .create()
*/
fornecSchema.pre('save', function(next) {
    console.log(this);
    this.nomeLower = slugify(this.nome, { lower: true });
    next();
})

/**
 * Query Middleware, permite executar consultas com criterios especificos
 * trazendo resultados especificos
 * 
 * /^find/ = regex para nao permitir buscar por id onde privado = true
 *          no controller findById = findOne 
 */
fornecSchema.pre(/^find/, function (next) {

    //buscar todos que forem false
    this.find({ privado: { $ne: true } });

    this.start = Date.now();
    next();
})

fornecSchema.post(/^find/, function (docs, next) {
    console.log(`Consulta levou ${Date.now() - this.start} milisegundos!`);
    // console.log(docs)
    next();
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