const { Empleados } = require('../models/empleados.js')
const { DATE } = require('sequelize')
const sequelize = require('../data/config.js')

const obtenerEmpleados = async(req, res) => {
    try {
        const empleados = await Empleados.findAll();
        res.status(200).json(empleados);
    } catch (e) {
        console.log('error al intentar obtener los empleados: ', e);
        res.status(500).json({ message: 'Error al intentar obtener los empleados: ' + e })
    }
}

const obtenerEmpleadoPorId = async(req, res) => {
    try {
        const idEmpleado = req.params.idEmpleado;
        const empleado = await(Empleados.findOne({
            where: { idEmpleado: idEmpleado }
        }));
        if(empleado!==null) { res.status(200).json(empleado); }
        else {
            res.status(404).json({ message: `Empleado con id ${idEmpleado} no fue encontrado.` });
        }
    } catch (e) {
        console.log(`Error al obtener el empleado con id ${req.params.idEmpleado}: `, e);
        res.status(500).json({ message: (`Error al obtener el empleado con id ${req.params.idEmpleado}: ` + e) });
    }
}

const altaEmpleado = async (req, res) => {
    try {
        const payload = req.body;
        let mensajeRta = "";
        if (!payload.nombre || !payload.dni || !payload.legajo || !payload.direccion) {
            (mensajeRta = ("Error al dar de alta a un empleado, se deben completar los campos."));
        }

        if (mensajeRta !== "") {
            res.status(404).json({ message: mensajeRta });
        } else {
            payload.fechaDeAlta = new Date();
            const { idEmpleado } = ((await Empleados.create(payload)) ?? -1)
            if (idEmpleado > 0) res.status(200).json({ message: ("Empleado registrado con el id: " + idEmpleado) });
            else res.status(500).json({ message: ("Error al registrar a un empleado.") });
        }
    }
    catch (e) {
        console.log("Error en el alta de un empleado: ", e)
        res.status(500).json({ message: ("Error en el alta de un empleado: " + e) });
    }
}

const modificarEmpleado = async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.dni) res.status(404).json({ message: ("Es necesario especificar el dni del empleado para poder modificar.") });
        else if ((payload.dni.toString()).trim().length < 7) res.status(400).json({ mensaje: 'El dni del empleado no es correcto.' });
        else {
            const empleado = await Empleados.findOne({ where: { dni: payload.dni } })
            if (empleado) {
                empleado.dni = payload.nuevoDni ?? empleado.dni;
                empleado.nombre = payload.nombre ?? empleado.nombre;
                empleado.legajo = payload.legajo ?? empleado.legajo;
                empleado.direccion = payload.direccion ?? empleado.direccion;
                await empleado.save()
                res.status(200).json({ 
                    message: `Empleado con dni ${empleado.dni} fue modificado con éxito. 
                    Los datos registrados del empleado son: ${empleado.nombre}, ${empleado.dni}, ${empleado.legajo}, ${empleado.direccion}` 
                })
            } else {
                res.status(404).json({ mensaje: 'El empleado no fue encontrado. Por favor revise el numero de DNI ingresado.' })
            }
        }
    }
    catch (e) {
        console.log("Error al querer modificar datos de un empleado: ", e)
        res.status(500).json({ message: ("Error al querer modificar datos de un empleado: " + e) });
    }
}

const bajaEmpleado = async (req, res) => {
    try {
        const dniEmpleado = req?.params?.dni;
        if (dniEmpleado) {
            const empleado = await Empleados.findOne({ where: { dni: dniEmpleado } });
            if (empleado) {
                await empleado.destroy();
                res.status(200).json({ message: `El empleado con dni ${empleado.dni} fue eliminado con éxito.` });
            } else {
                res.status(404).json({ mensaje: `El empleado con dni ${empleado.dni} no fue encontrado.` });
            }
        }
        else res.status(404).json({ message: ("Error se debe especificar el dni del empleado que se quiere eliminar.") });
    }
    catch (e) {
        console.log("Error al querer borrar un empleado:", e)
        res.status(500).json({ message: ("Error al querer borrar un empleado: " + e) });
    }
}

module.exports =  { obtenerEmpleados, obtenerEmpleadoPorId, altaEmpleado, modificarEmpleado, bajaEmpleado }