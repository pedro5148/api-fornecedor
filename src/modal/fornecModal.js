import mongoose from 'mongoose'
import slugify from 'slugify'

//Schema
const fornecSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Um fornecedor deve ter um nome'],
        trim: true, //remove espacos em branco no inicio e fim
        unique: true
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

duration nao existe no schema, é apenas um teste da funcionalidade do mongodb

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

export default Fornec;