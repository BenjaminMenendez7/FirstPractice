import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getClientePorId } from '../../services/clientes.service.js';

export default function EditarCliente({ onCancelar, onConfirmar, clienteId }) {
    const [idCliente, setIdCliente] = useState(null);
    const [nombre, setNombre] = useState('');
    const [fechaDeAlta, setFechaDeAlta] = useState('');
    const [dni, setDni] = useState('');
    const [direccion, setDireccion] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const obtenerCliente = async (clienteId) => {
        const response = await getClientePorId(clienteId);
        console.log("🚀 ~ getClientePorId ~ response:", response);
        if (response !== null) {
            setIdCliente(response.idCliente);
            setNombre(response.nombre);
            setFechaDeAlta(response.fechaDeAlta);
            setDni(response.dni.toString());
            setDireccion(response.direccion);
        }
    };

    useEffect(() => {
        if (clienteId) {
            obtenerCliente(clienteId);
        }
    }, [clienteId]);

    const onSubmit = (data) => {
        let submitDni = idCliente ? dni : data.dni

        onConfirmar({
            idCliente: idCliente,
            nombre: data.nombre,
            fechaDeAlta: fechaDeAlta,
            dni: submitDni,
            direccion: data.direccion,
        });
    };

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{idCliente ? "Edición de Cliente" : "Nuevo Cliente"}:</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                {...register('nombre', { required: 'El nombre es requerido' })}
                                defaultValue={nombre}
                            />
                            {errors.nombre && <>{errors.nombre.message}</>}
                        </div>
                        {idCliente ? "" : 
                            <div className="form-group">
                            <label htmlFor="dni">DNI:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="dni"
                                {...register('dni', {
                                    required: 'DNI requerido',
                                    minLength: 7,
                                    maxLength: 8,
                                    pattern: {
                                        value: /^\d+$/
                                    },
                                })}
                                defaultValue={dni}
                            />
                            {errors.dni && <>{errors.dni.message}</>}
                        </div>
                        }
                        <div className="form-group">
                            <label htmlFor="direccion">Direccion:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="direccion"
                                {...register('direccion', {
                                    required: 'Direccion requerido',
                                })}
                                defaultValue={direccion}
                            />
                            {errors.direccion && <>{errors.direccion.message}</>}
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