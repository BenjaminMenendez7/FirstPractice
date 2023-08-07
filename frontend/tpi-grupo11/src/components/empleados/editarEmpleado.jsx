import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getEmpleadoPorId } from '../../services/empleados.service.js';

export default function EditarEmpleado({ onCancelar, onConfirmar, empleadoId }) {
    const [idEmpleado, setIdEmpleado] = useState(null);
    const [nombre, setNombre] = useState('');
    const [fechaDeAlta, setFechaDeAlta] = useState('');
    const [legajo, setLegajo] = useState('')
    const [dni, setDni] = useState('');
    const [direccion, setDireccion] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const obtenerEmpleado = async (empleadoId) => {
        const response = await getEmpleadoPorId(empleadoId);
        console.log("🚀 ~ getEmpleadoPorId ~ response:", response);
        if (response !== null) {
            setIdEmpleado(response.idEmpleado);
            setNombre(response.nombre);
            setFechaDeAlta(response.fechaDeAlta);
            setLegajo(response.legajo.toString());
            setDni(response.dni.toString());
            setDireccion(response.direccion);
        }
    };

    useEffect(() => {
        if (empleadoId) {
            obtenerEmpleado(empleadoId);
        }
    }, [empleadoId]);

    const onSubmit = (data) => {
        let submitDni = idEmpleado ? dni : data.dni

        onConfirmar({
            idEmpleado: idEmpleado,
            nombre: data.nombre,
            fechaDeAlta: fechaDeAlta,
            legajo: data.legajo,
            dni: submitDni,
            direccion: data.direccion,
        });
    };

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{idEmpleado ? "Edición de Empleado" : "Nuevo Empleado"}:</h5>
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
                        

                            <div className="form-group">
                            <label htmlFor="legajo">Legajo:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="dni"
                                {...register('legajo', {
                                    required: 'legajo requerido',
                                    minLength: 3,
                                    pattern: {
                                        value: /^\d+$/
                                    },
                                })}
                                defaultValue={legajo}
                            />
                            {errors.legajo && <>{errors.legajo.message}</>}
                        </div>

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
                        <button type="submit" className="btn" style={{ backgroundColor: 'green', color: 'white' }}>
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