import Fornec from '../modal/fornecModal.js';

export class FornecedorService {
    async findAll() {
        return await Fornec.find();
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