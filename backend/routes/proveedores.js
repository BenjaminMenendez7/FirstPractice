const express = require("express")
const router = express.Router()
const { obtenerProveedores, obtenerProveedorPorId, cargarProveedor, modificarProveedor, eliminarProveedor} = require('../controllers/proveedores.js')

router.get('/proveedores', obtenerProveedores)
router.get('/proveedores/:id', obtenerProveedorPorId)
router.post('/proveedores', cargarProveedor)
router.put('/proveedores', modificarProveedor)
router.delete('/proveedor/:id', eliminarProveedor)

module.exports = router