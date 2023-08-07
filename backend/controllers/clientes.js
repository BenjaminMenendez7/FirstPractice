const { Clientes } = require('../models/clientes.js')
const { DATE } = require('sequelize');
const sequelize = require('../data/config.js');

const obtenerClientes = async (req, res) => {
    try {
        const clientes = await Clientes.findAll();
        res.status(200).json(clientes);
    }
    catch (e) {
        console.log("Error al obtener los clientes:", e);
        res.status(500).json({ message: ("Error al obtener los clientes: " + e) });
    }
}
const obtenerClientePorId = async (req, res) => {
    try {
        const idCliente = req.params.idCliente;
        const cliente = await Clientes.findOne({ where: { idCliente: idCliente } });
        if (cliente !== null) {res.status(200).json(cliente);} 
        else {res.status(404).json({ message: `Cliente con id ${idCliente} no fue encontrado.` });}
    }
    catch (e) {
        console.log(`Error al obtener el cliente con id ${req.params.idCliente}: `, e);
        res.status(500).json({ message: (`Error al obtener el cliente con id ${req.params.idCliente}: ` + e) });
    }
}
const altaCliente = async (req, res) => {
    try {
        const payload = req.body;
        let resultMessage = "";
        if (!payload.nombre || !payload.dni || !payload.direccion) {
            (resultMessage = ("Error al dar de alta al cliente, faltan campos por completar."));
        }

        if (resultMessage !== "") {
            res.status(404).json({ message: resultMessage });
        } else {
            payload.fechaDeAlta = new Date();
            const { idCliente } = ((await Clientes.create(payload)) ?? -1)
            if (idCliente > 0) res.status(200).json({ message: ("Cliente registrado con id " + idCliente) });
            else res.status(500).json({ message: ("Error al registrar al cliente.") });
        }
    }
    catch (e) {
        console.log("Error en el alta de Cliente: ", e)
        res.status(500).json({ message: ("Error en el alta de Cliente: " + e) });
    }
}
const modificarCliente = async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.dni) res.status(404).json({ message: ("Es necesario especificar el dni del cliente que se quiere modificar.") });
        else if ((payload.dni.toString()).trim().length < 7) res.status(400).json({ mensaje: 'El dni no es correcto.' });
        else {
            const cliente = await Clientes.findOne({ where: { dni: payload.dni } })
            if (cliente) {
                cliente.dni = payload.nuevoDni ?? cliente.dni;
                cliente.nombre = payload.nombre ?? cliente.nombre;
                cliente.direccion = payload.direccion ?? cliente.direccion;
                await cliente.save()
                res.status(200).json({ message: `Cliente con dni ${cliente.dni} fue modificado con éxito. Los datos registrados del cliente son: ${cliente.nombre}, ${cliente.dni}, ${cliente.direccion}` })
            } else {
                res.status(404).json({ mensaje: 'El cliente no fue encontrado.' })
            }
        }
    }
    catch (e) {
        console.log("Error al querer modificar un cliente: ", e)
        res.status(500).json({ message: ("Error al querer modificar un cliente: " + e) });
    }
}
const bajaCliente = async (req, res) => {
    try {
        const dniCliente = req?.params?.dni;
        if (dniCliente) {
            const cliente = await Clientes.findOne({ where: { dni: dniCliente } });
            if (cliente) {
                await cliente.destroy();
                res.status(200).json({ message: `El cliente con dni ${cliente.dni} fue eliminado con éxito.` });
            } else {
                res.status(404).json({ mensaje: 'Cliente no fue encontrado.' });
            }
        }
        else res.status(404).json({ message: ("Error se debe especificar el dni del cliente que se quiere eliminar.") });
    }
    catch (e) {
        console.log("Error al querer borrar un cliente:", e)
        res.status(500).json({ message: ("Error al querer borrar un cliente: " + e) });
    }
}


module.exports = { obtenerClientes, obtenerClientePorId, altaCliente, modificarCliente, bajaCliente }