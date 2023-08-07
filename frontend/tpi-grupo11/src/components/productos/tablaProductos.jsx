import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css';

export default function TablaProductos({ items, onClickDelete, onClickNuevo }) {
    return (
        <div className="card">
            <div className="card-body">
                <div className='row'>
                    <h5 className="card-title col-4 mt-1">Resultados:</h5>
                    <div className="card-title col-7"></div>
                    <div className="col-1">
                        <button onClick={() => onClickNuevo()}
                            className='btn btn-primary'>
                            Nuevo
                        </button>

                    </div>
                </div>
                <div className='row d-flex flex-column align-items-center'>
                    <div className='col-auto w-100 p-3'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Fecha De Alta</th>
                                    <th scope="col">Activo</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.IdProducto}</td>
                                            <td>{item.Nombre}</td>
                                            <td>{item.Precio}</td>
                                            <td>{item.FechaAlta}</td>
                                            <td>{(item.Activo) ? 'True' : 'False'}</td>
                                            <td>
                                                <div className='row'>
                                                    <button onClick={() => onClickNuevo(item)}
                                                        className='col-2 btn p-0'
                                                        style={{
                                                            backgroundColor: 'white',
                                                            color: 'purple'
                                                        }}
                                                    >
                                                        <i className="fas fa-pencil"></i>
                                                    </button>
                                                    <button onClick={() => onClickDelete(item.IdProducto)}
                                                        className='col-2 btn p-0'
                                                        style={{
                                                            backgroundColor: 'white',
                                                            color: 'purple'                                                        }}
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
