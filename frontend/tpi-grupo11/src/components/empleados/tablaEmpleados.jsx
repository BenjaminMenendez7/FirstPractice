import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css';

export default function TablaEmpleados({ items, onClickDelete, onClickNuevo }) {
    return (
        <div className="card">
            <div className="card-body">
                <div className='row'>
                    <h5 className="card-title col-4 mt-1">Resultados:</h5>
                    <div className="card-title col-7"></div>
                    <div className="col-1">
                        <button onClick={() => onClickNuevo()}
                            className='btn'
                            style={{
                                backgroundColor: 'green',
                                color: 'white'
                            }}
                        >
                            Nuevo
                        </button>

                    </div>
                </div>
                <div className='row d-flex flex-column align-items-center'>
                    <div className='col-auto'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Fecha De Alta</th>
                                    <th scope="col">Legajo</th>
                                    <th scope="col">DNI</th>
                                    <th scope="col">Direccion</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.idEmpleado}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.fechaDeAlta}</td>
                                            <td>{item.legajo}</td>
                                            <td>{item.dni}</td>
                                            <td>{item.direccion}</td>
                                            <td>
                                                <div className='row'>
                                                    <button onClick={() => onClickNuevo(item.idEmpleado)}
                                                        className='col-6 btn'
                                                        style={{
                                                            backgroundColor: 'white',
                                                            color: 'green'
                                                        }}
                                                    >
                                                        <i className="fas fa-pencil"></i>
                                                    </button>
                                                    <button onClick={() => onClickDelete(item.dni)}
                                                        className='col-6 btn'
                                                        style={{
                                                            backgroundColor: 'white',
                                                            color: 'green'
                                                        }}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )

                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}