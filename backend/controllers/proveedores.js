const sequelize = require('../data/config.js');
const { Proveedor } = require('../models/proveedores.js')
const { ValidationError } = require("sequelize");

const obtenerProveedores = async (req, res) => {
    const proveedores = await Proveedor.findAll()
    res.status(200).json(proveedores)
}

const obtenerProveedorPorId = async (req, res) => {
    try {
        const id = req.params.id
        const found = await Proveedor.findOne({ where: { id: id } })
        if (found) {
            res.json(found)
        } else {
            res.status(404).send({ mensaje: 'Proveedor inexistente!' })
        }
        console.log(found)
    } 
    catch (error) {
        res.status(500).send({ mensaje: 'Error interno!' })
    }
}

const cargarProveedor = async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        const proveedor = await Proveedor.create(data)
        res.json(proveedor)
    } 
    catch (error) {
        res.status(500).send({ mensaje: 'Error interno!' })
    }
}

const modificarProveedor = async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.id) res.status(404).json({ message: ("ERROR. Falta especificar Proveedor a modificar (idProveedor).") });
        else {
            const proveedor = await Proveedor.findOne({ where: { id: payload.id } })
            if (proveedor) {
                proveedor.nombre = payload.nombre
                proveedor.email = payload.nombre
                proveedor.telefono = payload.telefono
                proveedor.fechaIng = new Date()
                await proveedor.save()
                res.status(200).json({ message: `Proveedor con id: ${proveedor.id} modificado con éxito.` })
            } else {
                res.status(404).json({ mensaje: 'Proveedor no encontrado. Revise.' })
            }
        }
    }
    catch (error) {
        if (error instanceof ValidationError) {
            // si son errores de validacion, los devolvemos
            let messages = '';
            error.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
            res.status(400).json({message : messages});
        }else{
            console.log("ERROR. nuevoProveedor:", e)
            res.status(500).json({ message: ("ERROR. nuevoProveedor: " + e) });
        }
    }
}

const eliminarProveedor = async (req, res) => {
    try {
        const idABorrar = req?.params?.id;
        console.log("Id Proveedor:", idABorrar)
        if (idABorrar) {
            const proveedor = await Proveedor.findOne({ where: { id: idABorrar } });
            console.log("Proveedor:", proveedor)
            if (proveedor) {
                await proveedor.destroy();
                res.status(200).json({ message: `Proveedor con nombre: ${proveedor.id} eliminado con éxito.` });
            } else {
                res.status(404).json({ mensaje: 'Proveedor no encontrado. Revise.' });
            }
        }
        else res.status(404).json({ message: ("ERROR. Falta especificar el Proveedor a eliminar (id).") });
    }
    catch (e) {
        console.log("ERROR, eliminarProveedor:", e)
        res.status(500).json({ message: ("ERROR, eliminarProveedor: " + e) });
    }
}

module.exports = { obtenerProveedores, obtenerProveedorPorId, cargarProveedor, modificarProveedor, eliminarProveedor}