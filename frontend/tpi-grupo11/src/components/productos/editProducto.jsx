import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function EditProducto({ onCancelar, onConfirmar, producto }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ values: producto });

    return (
        <div>
            <div className="card">
                <div className="card-body w-50">
                    <h5 className="card-title">{producto ? "Edición de Producto" : "Nuevo Producto"}:</h5>
                    <form onSubmit={handleSubmit(onConfirmar)}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Nombre"
                                {...register('Nombre', { required: 'Nombre Requerido' })}
                            />
                            {errors.Nombre && <>{errors.Nombre.message}</>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="precio">Precio:</label>
                            <input
                                type="number" step=".01"
                                className="form-control"
                                id="Precio"
                                {...register("Precio", {
                                    required: { value: true, message: "Precio es requerido" },
                                    min: {
                                        value: 0.01,
                                        message: "Precio debe ser mayor a 0",
                                    },
                                    max: {
                                        value: 99999.99,
                                        message: "Precio debe ser menor o igual a 99999.99",
                                    },
                                })}
                            />
                            {errors.Precio && <>{errors.Precio.message}</>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="fechaAlta">Fecha de Alta:</label>
                            <div className='inline-block'>
                                <input
                                    className='form-control'
                                    type="datetime-local"
                                    id="FechaAlta"
                                    name="FechaAlta"
                                    {...register('FechaAlta', {
                                        required: 'Fecha de Alta requerida',
                                    })}
                                />
                                {errors.FechaAlta && <>{errors.FechaAlta.message}</>}
                            </div>
                        </div>
                        <div className="form-group form-check mt-2 mb-2">
                            <label className="form-check-label" htmlFor="Activo">Activo</label>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                {...register('Activo')}
                            />
                            {errors.Activo && <>{errors.Activo.message}</>}
                        </div>
                        <button type="submit" className="btn btn-primary m-1">
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