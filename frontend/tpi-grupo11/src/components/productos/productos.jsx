import React, { useEffect, useState } from 'react'
import {getProductos, deleteProducto, saveProducto} from '../../services/productos.service.js'
import FiltroProductos from './filtroProductos.jsx';
import TablaProductos from './tablaProductos.jsx';
import EditProducto from './editProducto.jsx';

export default function Productos(props) {
  const [filas, setFilas] = useState([]);
  const [action, setAction] = useState('C');
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    cargarProductos()
  }, [])


  const cargarProductos = async function (filtro) {
    const productos = await getProductos(filtro)
    setFilas(productos.map((element) => {
      const dateObj = new Date(element.FechaAlta);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
      return {
        IdProducto: element.IdProducto,
        Nombre : element.Nombre,
        Precio: element.Precio,
        FechaAlta: formattedDateTime,
        Activo: element.Activo
      }
    }))
  }

  const onConsultar = (filtro) => {
    setAction('C')
    cargarProductos(filtro)
  }
  const onNuevo = (producto) => {
    setProducto(producto)
    setAction('N')
  }
  const onCancelar = () => {
    setAction('C')
  }

  const onConfirmar = async (producto) => {
    await saveProducto(producto);
    await cargarProductos()
    setAction('C')
  }

  const onDelete = async(idProducto) => {
    await deleteProducto(idProducto)
    await cargarProductos()
    setAction('C')
  }


  return (
    <>
      {action === 'C' && (
        <div>
          <FiltroProductos onConsultar={onConsultar}></FiltroProductos>
          <TablaProductos items={filas} onClickNuevo={onNuevo} onClickDelete={onDelete}></TablaProductos>
        </div>
      )}

      {
        action === 'N' && (
          <div>
            { <EditProducto  onCancelar={onCancelar} onConfirmar={onConfirmar} producto={producto}/> }
          </div>
        )
      }
      <button onClick={props.clickInicio}
        className='btn btn-primary'
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
        }}
      >
        Inicio
      </button>
    </>
  )
}