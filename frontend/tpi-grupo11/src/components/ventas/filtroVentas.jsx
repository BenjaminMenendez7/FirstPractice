import React, { useState } from 'react'

export default function FiltroVentas({ onConsultar }) {
    //lógica del componente:
    const [descripcion, setDescripcion] = useState('')

    return (
        //jsx: (vista escrita en HTML+Js)    
        <div className='row'>
            <div className='col-12'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Filtros:</h5>
                        <div className='row'>
                            <div className='col-auto mt-1'>
                                Descripción:
                            </div>
                            <div className='col-auto mt-1'>
                                <input type='text'
                                    placeholder='Ingrese Descripción'
                                    onChange={(event) => { setDescripcion(event.target.value) }}
                                >
                                </input>
                            </div>
                            <div className='col-auto'>
                                <button type='button' className='btn' style={{
                                    backgroundColor: 'purple',
                                    color: 'white'
                                }}
                                    onClick={() => { onConsultar(descripcion) }}//enviamos solo un filtro como una variable
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