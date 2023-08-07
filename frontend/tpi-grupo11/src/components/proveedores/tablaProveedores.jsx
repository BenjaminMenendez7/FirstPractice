import React from "react";
import '@fortawesome/fontawesome-free/css/all.css';

export default function TablaProveedores({ onClickNuevo , onClickDelete , items }) {
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <h5 className="card-title col-4 mt-1">Resultados:</h5>
                    <div className="card-title col-7"></div>
                    <div className="col-1">
                        <button onClick={() => onClickNuevo()}
                        className="btn"
                        style={{
                            backgroundColor: 'yellow',
                            color: 'black'
                        }}
                        >
                            Nuevo
                        </button>
                    </div>
                </div>
                <div className="row d-flex flex-column align-items-center">
                    <div className="col-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Fecha de Ingreso</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items?.map((p , index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{p.id}</td>
                                            <td>{p.nombre}</td>
                                            <td>{p.email}</td>
                                            <td>{p.telefono}</td>
                                            <td>{p.fechaIng}</td>
                                            <td>
                                                <div className="row">
                                                    <button onClick={() => onClickNuevo(p.id)}
                                                    className="col-6 btn"
                                                    style={{
                                                        backgroundColor: 'white',
                                                        color: 'yellow'
                                                    }}
                                                    >
                                                        <i className="fas fa-pencil"></i>
                                                    </button>
                                                    <button onClick={() => onClickDelete(p.id)}
                                                    className="col-6 btn"
                                                    style={{
                                                        backgroundColor: 'white',
                                                        color: 'yellow'
                                                    }}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}