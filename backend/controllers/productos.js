const sequelize = require('../data/config.js');
const { Producto } = require('../models/productos.js')
const { Op, ValidationError } = require("sequelize");

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    }
    catch (e) {
        console.log("🚀 ERROR ~ obtenerProductos:", e);
        res.status(500).json({ message: ("🚀 ERROR ~ obtenerProductos: " + e) });
    }
}
const obtenerProductoPorId = async (req, res) => {
    try {
        const idProducto = req.params.idProducto;
        console.log("🚀 obtenerProductoPorId ~ IdProducto:", idProducto);
        const producto = await Producto.findOne({ where: { IdProducto: idProducto } });
        console.log("🚀 obtenerProductoPorId ~ Producto:", producto);
        if (producto) res.status(200).json(producto);
        else res.status(404).json({ message: `Producto con id: ${idProducto} no encontrado.` });
    }
    catch (e) {
        console.log("🚀 ERROR ~ obtenerProductoPorId:", e);
        res.status(500).json({ message: ("🚀 ERROR ~ obtenerProductos: " + e) });
    }
}
const nuevoProducto = async (req, res) => {
    try {
        const payload = req.body;
        const { IdProducto } = ((await Producto.create(payload)) ?? -1)
        if (IdProducto > 0) res.status(200).json({ message: ("Producto registrada exitosamente. IdProducto: " + IdProducto) });
        else res.status(500).json({ message: ("No se ha podido registrar el Producto.") });
    }catch (e) {
        if (e instanceof ValidationError) {
            // si son errores de validacion, los devolvemos
            let messages = '';
            e.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json({message : messages});
        }else{
            console.log("🚀 ERROR ~ nuevoProducto:", e)
            res.status(500).json({ message: ("🚀 ERROR ~ nuevoProducto: " + e) });
        }
    }
}
const modProducto = async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.IdProducto) res.status(404).json({ message: ("🚀 ERROR ~ Falta especificar Producto a modificar (IdProducto).") });
        else {
            const producto = await Producto.findOne({ where: { IdProducto: payload.IdProducto } })
            if (producto) {
                producto.IdProducto = ((!payload.IdProducto) || payload.IdProducto.length === 0) ? producto.IdProducto : payload.IdProducto;
                producto.Nombre = ((!payload.Nombre) || payload.Nombre.length === 0) ? producto.Nombre : payload.Nombre;
                producto.Precio = payload.Precio ?? producto.Precio;
                producto.FechaAlta = ((!payload.FechaAlta) || payload.FechaAlta.length === 0) ? producto.FechaAlta : payload.FechaAlta;
                producto.Activo = payload.Activo ?? producto.Activo;
                await producto.save()
                res.status(200).json({ message: `Producto con id: ${producto.IdProducto} modificada con éxito.` })
            } else {
                res.status(404).json({ mensaje: 'Producto no encontrada. Revise.' })
            }
        }
    }
    catch (err) {
        if (err instanceof ValidationError) {
            // si son errores de validacion, los devolvemos
            let messages = '';
            err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
            res.status(400).json({message : messages});
        }else{
            console.log("🚀 ERROR ~ nuevoProducto:", e)
            res.status(500).json({ message: ("🚀 ERROR ~ nuevoProducto: " + e) });
        }
    }
}
const delProducto = async (req, res) => {
    try {
        const id = req?.params?.idProducto;
        console.log("🚀 delProducto ~ IdProducto:", id)
        if (id) {
            const producto = await Producto.findOne({ where: { IdProducto: id } });
            console.log("🚀 delProducto ~ Producto:", producto)
            if (producto) {
                await producto.destroy();
                res.status(200).json({ message: `Producto con id: ${producto.IdProducto} eliminada con éxito.` });
            } else {
                res.status(404).json({ mensaje: 'Producto no encontrada. Revise.' });
            }
        }
        else res.status(404).json({ message: ("🚀 ERROR ~ Falta especificar Producto a eliminar (IdProducto).") });
    }
    catch (e) {
        console.log("🚀 ERROR ~ delProducto:", e)
        res.status(500).json({ message: ("🚀 ERROR ~ delProducto: " + e) });
    }
}


module.exports = { obtenerProductos, obtenerProductoPorId, nuevoProducto, modProducto, delProducto }