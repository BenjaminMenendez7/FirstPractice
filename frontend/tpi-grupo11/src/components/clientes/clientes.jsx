import React, { useEffect, useState } from 'react'
import TablaClientes from './tablaClientes'
import FiltroClientes from './filtroClientes'
import EditarCliente from './editarCliente'
import { getClientes, saveCliente, deleteCliente } from '../../services/clientes.service.js';

export default function Clientes(props) {
  const [filas, setFilas] = useState([]);
  const [idCliente, setIdCliente] = useState(null);
  const [action, setAction] = useState('C');

  //HOOK useEffect
  useEffect(() => {
    cargarClientes()
  }, [])

  const cargarClientes = async function (filtro) {
    const clientes = await getClientes(filtro)
    setFilas(clientes)
  }

  const onConsultar = (filtro) => {
    setAction('C')
    cargarClientes(filtro)
  }

  const onNuevo = (idCliente) => {
    setIdCliente(idCliente)
    setAction('N')
  }
  const onCancelar = () => {
    setAction('C')
    cargarClientes()
  }

  const onConfirmar = async (cliente) => {
    await saveCliente(cliente);
    await cargarClientes()
    setAction('C')
  }

  const onDelete = async (idCliente) => {
    await deleteCliente(idCliente);
    await cargarClientes()
    setAction('C')
  }

  return (
    <>
      {action === 'C' && (
        <div>
          <FiltroClientes onConsultar={onConsultar}></FiltroClientes>
          <TablaClientes items={filas} onClickNuevo={onNuevo} onClickDelete={onDelete}></TablaClientes>
        </div>
      )}

      {
        action === 'N' && (
          <div>
            <EditarCliente onCancelar={onCancelar} onConfirmar={onConfirmar} clienteId={idCliente} />
          </div>
        )
      }
      <button onClick={props.clickInicio}
      className='btn btn-danger'
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