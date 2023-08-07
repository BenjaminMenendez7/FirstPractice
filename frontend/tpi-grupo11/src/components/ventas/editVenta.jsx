import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getVentasPorId } from '../../services/ventas.service.js';

export default function EditVenta({ onCancelar, onConfirmar, idVenta }) {
    const [id, setId] = useState(null);
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [cliente, setCliente] = useState('');
    const [empleado, setEmpleado] = useState('');
    const [producto, setProducto] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const obtenerVenta = async (idVenta) => {
        const response = await getVentasPorId(idVenta);
        console.log("🚀 ~ obtenerVenta ~ response:", response);
        if (response !== null) {
            setId(response.idVenta);
            setDescripcion(response.descVenta);
            setFecha(response.fechaVenta);
            setProveedor(response.idProveedor);
            setCliente(response.idCliente.toString());
            setEmpleado(response.idEmpleado);
            setProducto(response.idProducto);
        }
    };

    useEffect(() => {
        if (idVenta) {
            obtenerVenta(idVenta);
        }
    }, [idVenta]);

    const onSubmit = (data) => {
        onConfirmar({
            idVenta: id,
            descVenta: data.descripcion,
            idProveedor: data.proveedor,
            fechaVenta: fecha,
            idCliente: data.cliente,
            idEmpleado: data.empleado,
            idProducto: data.producto,
        });
    };

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{id ? "Edición de Venta" : "Nueva Venta"}:</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripción:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcion"
                                {...register('descripcion', { required: 'Descripción requerida' })}
                                defaultValue={descripcion}
                            />
                            {errors.descripcion && <>{errors.descripcion.message}</>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="proveedor">Proveedor:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="proveedor"
                                {...register('proveedor', {
                                    required: 'Proveedor requerido',
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'El Proveedor debe ser un número entero mayor a cero',
                                    },
                                })}
                                defaultValue={proveedor}
                            />
                            {errors.proveedor && <>{errors.proveedor.message}</>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="cliente">Cliente:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cliente"
                                {...register('cliente', {
                                    required: 'Cliente requerido',
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'El cliente debe ser un número entero mayor a cero',
                                    },
                                })}
                                defaultValue={cliente}
                            />
                            {errors.cliente && <>{errors.cliente.message}</>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="empleado">Empleado:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="empleado"
                                {...register('empleado', {
                                    required: 'Empleado requerido', pattern: {
                                        value: /^\d+$/,
                                        message: 'El empleado debe ser un número entero mayor a cero',
                                    },
                                })}
                                defaultValue={empleado}
                            />
                            {errors.empleado && <>{errors.empleado.message}</>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="producto">Producto:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="producto"
                                {...register('producto', {
                                    required: 'Producto requerido',
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'El producto debe ser un número entero mayor a cero',
                                    },
                                })}
                                defaultValue={producto}
                            />
                            {errors.producto && <>{errors.producto.message}</>}
                        </div>
                        <button type="submit" className="btn" style={{ backgroundColor: 'purple', color: 'white' }}>
                            Confirmar
                        </button>
                        <button type='button' className='btn btn-secondary' onClick={() => { onCancelar() }}>
                            Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}