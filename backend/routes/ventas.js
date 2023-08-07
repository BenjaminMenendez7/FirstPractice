// Ventas, lo hace alexis

const express = require('express');
const router = express.Router()
const {obtenerVentaPorId, obtenerVentas, nuevaVenta, modVenta, delVenta} = require('../controllers/ventas.js')

router.get('/ventas', obtenerVentas)
router.get('/venta/:idVenta', obtenerVentaPorId)
router.post('/venta', nuevaVenta)
router.put('/venta', modVenta)
router.delete('/venta/:idVenta', delVenta)

module.exports = router