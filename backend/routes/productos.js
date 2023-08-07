const express = require('express')
const router = express.Router()
const {obtenerProductoPorId, obtenerProductos, nuevoProducto, modProducto, delProducto} = require('../controllers/productos.js')

router.get('/productos', obtenerProductos)
router.get('/producto/:idProducto', obtenerProductoPorId)
router.post('/producto', nuevoProducto)
router.put('/producto', modProducto)
router.delete('/producto/:idProducto', delProducto)

module.exports = router

