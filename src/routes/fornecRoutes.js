import express from 'express'
import * as fornecController from '../controllers/fornecedorController.js'

const router = express.Router()

//Middleware para checar o id da requisicao
//router.param('id', fornecController.checkId)

router
    .route('/')
    .get(fornecController.getAllFornec)
    .post(fornecController.createFornec)

router
    .route('/:id')
    .get(fornecController.getFornecbyId)
    .patch(fornecController.updateFornec)
    .delete(fornecController.deleteFornec)

export default router;