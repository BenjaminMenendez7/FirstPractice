const express = require('express');
const router = express.Router()
const {obtenerEmpleados, obtenerEmpleadoPorId, altaEmpleado, modificarEmpleado, bajaEmpleado} = require('../controllers/empleados.js')

router.get('/empleados', obtenerEmpleados)
router.get('/empleados/:idEmpleado', obtenerEmpleadoPorId)
router.post('/empleados', altaEmpleado)
router.put('/empleados', modificarEmpleado)
router.delete('/empleados/:dni', bajaEmpleado)
module.exports =  router