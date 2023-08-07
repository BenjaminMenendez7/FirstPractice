import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getProveedorPorId } from '../../services/proveedores.service.js';

export default function EditVenta({ onCancelar, onConfirmar, idProveedor }) {
    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState(null);
    const [fecha, setFecha] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const obtenerProveedor = async (idProveedor) => {
        const response = await getProveedorPorId(idProveedor);
        console.log("Obtener proveedor:", response);
        if (response !== null) {
            setId(response.id);
            setNombre(response.nombre);
            setEmail(response.email);
            setTelefono(response.telefono.toString());
            setFecha(response.fechaIng);
        }
    };

    useEffect(() => {
        if (idProveedor) {
            obtenerProveedor(idProveedor);
        }
    }, [idProveedor]);

    const onSubmit = (data) => {
        onConfirmar({
            id: id,
            nombre: data.nombre,
            email: data.email,
            telefono: data.telefono,
            fechaIng: fecha,
        });
    };

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{id ? "Editar Proveedor" : "Nuevo Proveedor"}:</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                {...register('nombre', { required: 'Nombre requerido' })}
                                defaultValue={nombre}
                            />
                            {errors.nombre && <>{errors.nombre.message}</>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                {...register('email', {
                                    required: 'Email requerido' })}
                                defaultValue={email}
                            />
                            {errors.email && <>{errors.email.message}</>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="telefono"
                                {...register('telefono', {
                                    required: 'Telefono requerido' })}
                                defaultValue={telefono}
                            />
                            {errors.telefono && <>{errors.telefono.message}</>}
                        </div>
                        <button type="submit" className="btn" style={{ backgroundColor: 'yellow', color: 'black' }}>
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