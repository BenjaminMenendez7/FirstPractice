import React, { useState } from 'react'

export default function FiltroProductos({ onConsultar }) {
    const [nombre, setNombre] = useState('')

    return (
        <div className='row'>
            <div className='col-12'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Filtros:</h5>
                        <div className='row'>
                            <div className='col-auto mt-1'>
                                Nombre:
                            </div>
                            <div className='col-auto mt-1'>
                                <input type='text'
                                    placeholder='Ingrese Nombre'
                                    onChange={(event) => { setNombre(event.target.value) }}
                                >
                                </input>
                            </div>
                            <div className='col-auto'>
                                <button type='button' className='btn btn-primary'
                                    onClick={() => { onConsultar(nombre) }}
                                >
                                    Consultar
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}