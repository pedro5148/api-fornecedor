import Fornec from '../modal/fornecModal.js';

export class FornecedorService {
    async findAll(filters = {}) {
        const queryObj = {...filters};

        const camposNaoFiltros = ['sort', 'page', 'limit', 'fields'];
        camposNaoFiltros.forEach(campo => delete queryObj[campo]);

        //Filtros basicos
        const excluiCampos = ['telefone','email','endereco','produtos'] // filtrar apenas por nome, cnpj e status
        excluiCampos.forEach(campo => delete queryObj[campo]);

        //filtros condicionais =,>=,<=, exemplo: ?tempo[gte]=5&status=inativo
        let queryStr = JSON.stringify(queryObj);
        // console.log('Query inicial:', queryStr);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        const parsedFilters = JSON.parse(queryStr); //Obj dos filtros

        console.log('Filtros condicionais:', parsedFilters);

        let query = Fornec.find(parsedFilters);        

        //Ordenando
        if (filters.sort) { //sort vem da requisicao ?sort=preco
            const orderBy = filters.sort.split(',').join(' ');
            console.log('Filtros de ordenacao:', orderBy);
            query = query.sort(orderBy);
        } else {
            query = query.sort('-dataCriacao'); //adicionar no banco data da criacao
        }

        //Limitando campos retornados
        if (filters.fields) {
            const fields = filters.fields.split(',').join(' ')
            query = query.select(fields);
        } else {
            query = query.select('-__v') // Retorna todos os campos, exceto esse
        }

        const result = await query;
        // console.log('Resultados retornados:', result);
        return result;
        // return await query;
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