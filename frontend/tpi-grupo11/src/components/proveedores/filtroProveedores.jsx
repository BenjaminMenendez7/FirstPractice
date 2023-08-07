import React, { useState } from 'react'

export default function FiltroProveedores({ onConsultar }) {
    //lógica del componente:
    const [nombre, setNombre] = useState('')

    return (
        //jsx: (vista escrita en HTML+Js)    
        <div className='row'>
            <div className='col-12'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Filtro:</h5>
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
                                <button type='button' className='btn' style={{
                                    backgroundColor: 'yellow',
                                    color: 'black'
                                }}
                                    onClick={() => { onConsultar(nombre) }}//enviamos solo un filtro como una variable
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