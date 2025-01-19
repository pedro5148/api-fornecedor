import { FornecedorService } from '../service/fornecedorService.js';
const fornecedorService = new FornecedorService();
import catchAsync from './../utils/catchAsync.js'

//Route Handlers
//exports.getAllFornec = async (req, res) => {
export const getAllFornec = catchAsync(async (req, res) => {

        console.log('Filtros da requisicao:', req.query) //testando filtros
        const fornec = await fornecedorService.findAll(req.query);
        res.status(200).json({ 
            status: 'sucess',
            requestdAt: req.requestTime,
            results: fornec.length, 
            data: {
                fornec
            } 
        })
  });
  
//exports.getFornecbyId = async (req, res) => {
export const getFornecbyId = catchAsync(async (req, res) => {

        const fornecedor = await fornecedorService.findById(req.params.id);
        
        res.status(200).json({ 
            status: 'sucess', 
            requestdAt: req.requestTime,
            data: {
                fornecedor 
            }
        }); 
});

//exports.createFornec = async (req, res) => {
export const createFornec = catchAsync(async (req, res) => {

        const newFornec = await fornecedorService.create(req.body);

        res.status(201).json({
            status: 'sucess', 
            requestdAt: req.requestTime,
            data: {
                fornecedor: newFornec
            }
        })      
});

//exports.updateFornec = (req, res) => {
export const updateFornec = catchAsync(async (req, res) => { 
        const updateFornec = await fornecedorService.update(req.params.id, req.body)
        res.status(204).json({ 
            status: 'sucess',
            requestdAt: req.requestTime, 
            data: {
                updateFornec
            } 
        });    
});

//exports.deleteFornec = (req, res) => {
export const deleteFornec = catchAsync(async (req, res) => {
        await fornecedorService.delete(req.params.id); // nao devolver nada para o cliente (RESTFUL)
        res.status(204).json({ 
            status: 'sucess',
            data: null
        });    
});