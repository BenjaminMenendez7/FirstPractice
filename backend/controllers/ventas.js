// Ventas, lo hace Alexis Rovezzi 79448
const { DATE } = require('sequelize');
const sequelize = require('../data/config.js');
const { Venta } = require('../models/ventas.js')

const obtenerVentas = async (req, res) => {
    try {
        const ventas = await Venta.findAll();
        res.status(200).json(ventas);
    }
    catch (e) {
        console.log("🚀 ERROR ~ obtenerVentas:", e);
        res.status(500).json({ message: ("🚀 ERROR ~ obtenerVentas: " + e) });
    }
}
const obtenerVentaPorId = async (req, res) => {
    try {
        const idVenta = req.params.idVenta;
        console.log("🚀 obtenerVentaPorId ~ idVenta:", idVenta);
        const venta = await Venta.findOne({ where: { idVenta: idVenta } });
        console.log("🚀 obtenerVentaPorId ~ venta:", venta);
        if (venta) res.status(200).json(venta);
        else res.status(404).json({ message: `Venta con id: ${idVenta} no encontrada.` });
    }
    catch (e) {
        console.log("🚀 ERROR ~ obtenerVentaPorId:", e);
        res.status(500).json({ message: ("🚀 ERROR ~ obtenerVentas: " + e) });
    }
}
const nuevaVenta = async (req, res) => {
    try {
        const payload = req.body;
        console.log("🚀 ~ nuevaVenta ~ payload:", payload)
        // Validaciones;
        let resultMessage = "";
        if (!payload.descVenta) (resultMessage = (resultMessage + " Falta una descripcion de la venta (descVenta)."));
        if (!payload.idProveedor) (resultMessage = (resultMessage + " Falta especificar proveedor (idProveedor)."));
        if (!payload.idCliente) (resultMessage = (resultMessage + " Falta especificar cliente (idCliente)."));
        if (!payload.idEmpleado) (resultMessage = (resultMessage + " Falta especificar empleado (idEmpleado)."));
        if (!payload.idProducto) (resultMessage = (resultMessage + " Falta especificar producto (idProducto)."));
        if (!payload.fechaVenta) payload.fechaVenta = new Date();
        console.log("🚀 ~ nuevaVenta ~ resultMessage:", resultMessage.length)
        if (resultMessage.length > 0) {
            resultMessage = "ERROR ~" + resultMessage;
            res.status(404).json({ message: resultMessage });
        } else {
            const { idVenta } = ((await Venta.create(payload)) ?? -1)
            if (idVenta > 0) res.status(200).json({ message: ("Venta registrada con éxito. idVenta: " + idVenta) });
            else res.status(500).json({ message: ("No se ha podido registrar venta. Revise.") });
        }
    }
    catch (e) {
        console.log("🚀 ERROR ~ nuevaVenta:", e)
        res.status(500).json({ message: ("🚀 ERROR ~ nuevaVenta: " + e) });
    }
}
const modVenta = async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.idVenta) res.status(404).json({ message: ("🚀 ERROR ~ Falta especificar venta a modificar (idVenta).") });
        else {
            const venta = await Venta.findOne({ where: { idVenta: payload.idVenta } })
            if (venta) {
                venta.descVenta = ((!payload.descVenta) || payload.descVenta.length === 0) ? venta.descVenta : payload.descVenta;
                venta.fechaVenta = ((!payload.fechaVenta) || payload.fechaVenta.length === 0) ? venta.fechaVenta : payload.fechaVenta;
                venta.idCliente = payload.idCliente ?? venta.idCliente;
                venta.idEmpleado = payload.idEmpleado ?? venta.idEmpleado;
                venta.idProducto = payload.idProducto ?? venta.idProducto;
                venta.idProveedor = payload.idProveedor ?? venta.idProveedor;
                await venta.save()
                res.status(200).json({ message: `Venta con id: ${venta.idVenta} modificada con éxito.` })
            } else {
                res.status(404).json({ mensaje: 'Venta no encontrada. Revise.' })
            }
        }
    }
    catch (e) {
        console.log("🚀 ERROR ~ modVenta:", e)
        res.status(500).json({ message: ("🚀 ERROR ~ modVenta: " + e) });
    }
}
const delVenta = async (req, res) => {
    try {
        const idVenta = req?.params?.idVenta;
        console.log("🚀 delVenta ~ idVenta:", idVenta)
        if (idVenta) {
            const venta = await Venta.findOne({ where: { idVenta: idVenta } });
            console.log("🚀 delVenta ~ venta:", venta)
            if (venta) {
                await venta.destroy();
                res.status(200).json({ message: `Venta con id: ${venta.idVenta} eliminada con éxito.` });
            } else {
                res.status(404).json({ mensaje: 'Venta no encontrada. Revise.' });
            }
        }
        else res.status(404).json({ message: ("🚀 ERROR ~ Falta especificar venta a eliminar (idVenta).") });
    }
    catch (e) {
        console.log("🚀 ERROR ~ delVenta:", e)
        res.status(500).json({ message: ("🚀 ERROR ~ delVenta: " + e) });
    }
}


module.exports = { obtenerVentas, obtenerVentaPorId, nuevaVenta, modVenta, delVenta }