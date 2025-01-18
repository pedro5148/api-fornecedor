export class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const camposNaoFiltros = ['sort', 'page', 'limit', 'fields'];
        camposNaoFiltros.forEach(campo => delete queryObj[campo]);

        // Substituir operadores condicionais como gte, gt, lte, lt
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-dataCriacao');
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    // paginate() { ############ TESTAR PAGINACAO
    //     const page = this.queryString.page * 1 || 1;
    //     const limit = this.queryString.limit * 1 || 100;
    //     const skip = (page - 1) * limit;

    //     this.query = this.query.skip(skip).limit(limit);
    //     return this;
    // }
}


// const queryObj = {...filters};

//         const camposNaoFiltros = ['sort', 'page', 'limit', 'fields'];
//         camposNaoFiltros.forEach(campo => delete queryObj[campo]);

//         //Filtros basicos
//         const excluiCampos = ['telefone','email','endereco','produtos'] // filtrar apenas por nome, cnpj e status
//         excluiCampos.forEach(campo => delete queryObj[campo]);

//         //filtros condicionais =,>=,<=, exemplo: ?tempo[gte]=5&status=inativo
//         let queryStr = JSON.stringify(queryObj);
//         // console.log('Query inicial:', queryStr);
//         queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
//         const parsedFilters = JSON.parse(queryStr); //Obj dos filtros

//         console.log('Filtros condicionais:', parsedFilters);

//         let query = Fornec.find(parsedFilters);        

//         //Ordenando
//         if (filters.sort) { //sort vem da requisicao ?sort=preco
//             const orderBy = filters.sort.split(',').join(' ');
//             console.log('Filtros de ordenacao:', orderBy);
//             query = query.sort(orderBy);
//         } else {
//             query = query.sort('-dataCriacao'); //adicionar no banco data da criacao
//         }

//         //Limitando campos retornados
//         if (filters.fields) {
//             const fields = filters.fields.split(',').join(' ')
//             query = query.select(fields);
//         } else {
//             query = query.select('-__v') // Retorna todos os campos, exceto esse
//         }

//         const result = await query;
//         // console.log('Resultados retornados:', result);
//         return result;
//         // return await query;