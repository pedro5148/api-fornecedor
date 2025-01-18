import Fornec from '../modal/fornecModal.js';
import {APIFeatures} from '../utils/apiFeatures.js';

export class FornecedorService {
    async findAll(filters = {}) {
        const features = new APIFeatures(Fornec.find(), filters)
            .filter()
            .sort()
            .limitFields();

        return await features.query;
    }

    async findById(id) {
        return await Fornec.findById(id);
    }

    async create(data) {
        return await Fornec.create(data);
    }

    async update(id, data) {
        return Fornec.findByIdAndUpdate(id, data, {
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