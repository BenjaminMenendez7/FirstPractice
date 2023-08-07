import React, { useState } from 'react'

export default function FiltroClientes({ onConsultar }) {
    //lógica del componente:
    const [nombre, setNombre] = useState('')

    return (
        //jsx: (vista escrita en HTML+Js)    
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
                                    placeholder='Ingrese un nombre'
                                    onChange={(event) => { setNombre(event.target.value) }}
                                >
                                </input>
                            </div>
                            <div className='col-auto'>
                                <button type='button' className='btn' style={{
                                    backgroundColor: 'purple',
                                    color: 'white'
                                }}
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