import Fornec from '../modal/fornecModal.js';

export class FornecedorService {
    async findAll(filters = {}) {
        const queryObj = {...filters};

        //Filtros basicos
        const excludeFields = ['telefone','email','endereco','produtos'] // filtrar apenas por nome, cnpj e status
        excludeFields.forEach(elementos => delete queryObj[elementos]);

        //filtros condicionais =,>=,<=, do tipo ?tempo[gte]=5&status=inativo
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        const parsedQuery = JSON.parse(queryStr); //converte para objeto
        console.log('Filtros aplicados:', parsedQuery);


        return await Fornec.find(parsedQuery);
    }

    async findById(id) {
        return await Fornec.findById(id);
    }

    async create(data) {
        return await Fornec.create(data);
    }

    async update(id, data) {
        return await Fornec.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true, // Valida os campos do esquema
        });
    }

    async delete(id) {
        return await Fornec.findByIdAndDelete(id);
    }
    
    async deleteMany(criteria = {}) {
        return await Fornec.deleteMany(criteria);
    }
    
}