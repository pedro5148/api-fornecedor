//const express = require('express')
import express from 'express'
//const fornecController = require('../controllers/fornecedorController')
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

//module.exports = router;
export default router;