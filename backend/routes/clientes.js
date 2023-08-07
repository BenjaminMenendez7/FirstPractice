const express = require('express');
const router = express.Router()
const {obtenerClientes, obtenerClientePorId, altaCliente, modificarCliente, bajaCliente} = require('../controllers/clientes.js')

router.get('/clientes', obtenerClientes)
router.get('/clientes/:idCliente', obtenerClientePorId)
router.post('/clientes', altaCliente)
router.put('/clientes', modificarCliente)
router.delete('/clientes/:dni', bajaCliente)

module.exports =  router