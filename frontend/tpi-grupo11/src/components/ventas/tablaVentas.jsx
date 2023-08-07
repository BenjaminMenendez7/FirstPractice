import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css';

export default function TablaVentas({ items, onClickDelete, onClickNuevo }) {
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
                                backgroundColor: 'purple',
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
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Proveedor</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Empleado</th>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.idVenta}</td>
                                            <td>{item.descVenta}</td>
                                            <td>{item.fechaVenta}</td>
                                            <td>{item.idProveedor}</td>
                                            <td>{item.idCliente}</td>
                                            <td>{item.idEmpleado}</td>
                                            <td>{item.idProducto}</td>
                                            <td>
                                                <div className='row'>
                                                    <button onClick={() => onClickNuevo(item.idVenta)}
                                                        className='col-6 btn'
                                                        style={{
                                                            backgroundColor: 'white',
                                                            color: 'purple'
                                                        }}
                                                    >
                                                        <i className="fas fa-pencil"></i>
                                                    </button>
                                                    <button onClick={() => onClickDelete(item.idVenta)}
                                                        className='col-6 btn'
                                                        style={{
                                                            backgroundColor: 'white',
                                                            color: 'purple'
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