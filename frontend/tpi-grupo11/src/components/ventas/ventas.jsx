import React, { useEffect, useState } from 'react'
import TablaVentas from './tablaVentas';
import FiltroVentas from './filtroVentas';
import { getVentas, saveVenta, deleteVenta } from '../../services/ventas.service.js';
import EditVenta from './editVenta';

export default function Ventas(props) {
  const [filas, setFilas] = useState([]);
  const [idVenta, setIdVenta] = useState(null);
  // Se setea con c xq significa Consulta.
  const [action, setAction] = useState('C');

  //HOOK useEffect
  useEffect(() => {
    //Se dispara cuando se dibuja el componente
    cargarVentas()//acá filtro queda como undefined, recupera todas las ventas

  }, [])


  const cargarVentas = async function (filtro) {
    const ventas = await getVentas(filtro)
    console.log("🚀 ~ file: ventas.jsx:20 ~ cargarVentas ~ ventas:", ventas)
    setFilas(ventas)
  }

  //Recibimos solo un filtro, no un objeto de filtros
  const onConsultar = (filtro) => {
    console.log("🚀 ~ file: ventas.jsx:27 ~ onConsultar ~ filtro:", filtro)
    setAction('C');
    cargarVentas(filtro)
  }
  const onNuevo = (idVenta) => {
    console.log("🚀 ~ file: ventas.jsx:30 ~ onNuevo ~ idVenta:", idVenta)
    setIdVenta(idVenta);
    setAction('N');
  }
  const onCancelar = () => {
    setAction('C')
    cargarVentas()
  }

  const onConfirmar = async (venta) => {
    console.log("🚀 ~ file: ventas.jsx:44 ~ onConfirmar ~ venta:", venta)
    await saveVenta(venta);
    await cargarVentas()
    setAction('C')
  }
  const onDelete = async (ventaId) => {
    console.log("🚀 ~ file: ventas.jsx:42 ~ onDelete ~ ventaId:", ventaId)
    await deleteVenta(ventaId);
    await cargarVentas()
    setAction('C')
  }


  return (
    //jsx: (vista escrita en HTML+Js)    
    <>
      {action === 'C' && (
        <div>
            <FiltroVentas onConsultar={onConsultar}/>
          <TablaVentas onClickNuevo={onNuevo} onClickDelete={onDelete} items={filas}/>
        </div>
      )}

      {
        action === 'N' && (
          <div>
            <EditVenta onCancelar={onCancelar} idVenta={idVenta} onConfirmar={onConfirmar}/>
          </div>
        )
      }
      <button onClick={props.clickInicio}
      className='btn'
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'purple', 
          color: 'white'
        }}
      >
        Inicio
      </button>
    </>
  )
}
