// const fs = require('fs')
//const app = require('../app')
//const Fornec = require('./../modal/fornecModal')
//import Fornec from './../modal/fornecModal'
import { FornecedorService } from '../service/fornecedorService.js';
const fornecedorService = new FornecedorService();
// const fornecedores = JSON.parse(
//     fs.readFileSync(`${__dirname}/../data/fornecedores.json`)
//   );

// exports.checkId = (req, res, next, val) => {
//     console.log(`Pass id ${val}`);
//     if (req.params.id * 1 > fornecedores.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Id invalido'
//         })
//     }
//     next();
// }

// exports.checkBody = (req, res, next) => {
//     if (!req.body.nome || !req.body.cnpj) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Faltando nome ou CNPJ'
//         });
//     }
//     next();
// }

//Route Handlers
//exports.getAllFornec = async (req, res) => {
export const getAllFornec = async (req, res) => {
    try{
        console.log(req.query)
        //const fornec = await Fornec.find();
        const fornec = await fornecedorService.findAll();
        res.status(200).json({ 
            status: 'sucess',
            requestdAt: req.requestTime,
            results: fornec.length, 
            data: {
                fornec
            } 
        });
    } catch (err) {
        console.error("Erro ao buscar movimentos:", err.message);
        res.status(500).json({ 
            err: "Erro ao buscar movimentos" 
        });
    }
  };
  
//exports.getFornecbyId = async (req, res) => {
export const getFornecbyId = async (req, res) => {
    try {
        const fornecedor = await fornecedorService.findById(req.params.id);
        
        res.status(200).json({ 
            status: 'sucess', 
            requestdAt: req.requestTime,
            data: {
                fornecedor 
            }
        });    
    } catch (err) {
        console.error("Erro ao buscar o fornecedor:", err.message);
        res.status(500).json({ 
            err: "Erro ao buscar o fornecedor" 
        });
    }

};

//exports.createFornec = async (req, res) => {
export const createFornec = async (req, res) => {
    try {
        // const newId = fornecedores.length > 0 
        //     ? fornecedores[fornecedores.length - 1].id + 1 
        //     : 1;

        // const newFornec = Object.assign({
        //     id: newId, 
        //     ...req.body
        // });
        // fornecedores.push(newFornec);
        const newFornec = await fornecedorService.create(req.body);

        res.status(201).json({
            status: 'sucess', 
            requestdAt: req.requestTime,
            data: {
                fornecedor: newFornec
            }
        })    
    } catch (err) {
        console.error("Erro ao inserir novo fornecedor:", err.message);
        res.status(500).json({ 
            status: 'error',
            message: 'Erro ao inserir fornecedor',
            error: err.message
         });
    }
    
};

//exports.updateFornec = (req, res) => {
export const updateFornec = async (req, res) => { 
    try {
        const updateFornec = await fornecedorService.update(req.params.id, req.body)
        res.status(204).json({ 
            status: 'sucess',
            requestdAt: req.requestTime, 
            data: {
                updateFornec
            } 
        });    
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }   
};

//exports.deleteFornec = (req, res) => {
export const deleteFornec = async (req, res) => {
    try {
        await fornecedorService.delete(req.params.id); // nao devolver nada para o cliente (RESTFUL)
        res.status(204).json({ 
            status: 'sucess',
            data: null
        });    
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};