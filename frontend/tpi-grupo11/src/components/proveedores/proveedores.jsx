import React, { useEffect, useState } from 'react'
import FiltroProveedores from "./filtroProveedores"
import TablaProveedores from './tablaProveedores'
import RegistroProveedor from './registroProveedor'
import { getProveedores , guardarProveedor , eliminarProveedor } from "../../services/proveedores.service.js"

export default function Proveedores(props) {
  const [filas, setFilas] = useState([]);
  // Se setea con c xq significa Consulta.
  const [action, setAction] = useState('C');
  const [idProveedor, setIdProveedor] = useState(null)

  //HOOK useEffect
  useEffect(() => {
    //Se dispara cuando se dibuja el componente
    cargarProveedores()//acá filtro queda como undefined, recupera todas las ventas

  }, [])


  const cargarProveedores = async function (filtro) {
    const proveedores = await getProveedores(filtro)
    setFilas(proveedores)
  }

  //Recibimos solo un filtro, no un objeto de filtros
  const onConsultar = (filtro) => {
    setAction('C')
    cargarProveedores(filtro)
  }
  const onNuevo = (idProveedor) => {
    setIdProveedor(idProveedor)
    setAction('N')
  }
  const onCancelar = () => {
    setAction('C')
    cargarProveedores()
  }

  const onConfirmar = async (proveedor) => {
    await guardarProveedor(proveedor)
    await cargarProveedores()
    setAction('C')
  }

  const onDelete = async (proveedorId) => {
    await eliminarProveedor(proveedorId)
    await cargarProveedores()
    setAction('C')
  }


  return (
    //jsx: (vista escrita en HTML+Js)    
    <>
      {action === 'C' && (
        <div>
            <FiltroProveedores  onConsultar={onConsultar}/>
            <TablaProveedores onClickNuevo={onNuevo} onClickDelete={onDelete} items={filas}/>
        </div>
      )}

      {
        action === 'N' && (
          <div>
            <RegistroProveedor onCancelar={onCancelar} onConfirmar={onConfirmar} idProveedor={idProveedor}/>
          </div>
        )
      }
      <button onClick={props.clickInicio}
      className='btn'
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'yellow',
          color: 'black'
        }}
      >
        Inicio
      </button>
    </>
  )
}
