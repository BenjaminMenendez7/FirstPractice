import React, { useEffect, useState } from 'react'
import TablaEmpleados from './tablaEmpleados'
import FiltroEmpleados from './filtroEmpleados'
import EditarEmpleado from './editarEmpleado'
import { getEmpleados, saveEmpleado, deleteEmpleado } from '../../services/empleados.service.js'

export default function Empleados(props) {
  const [filas, setFilas] = useState([]);
  const [idEmpleado, setIdEmpleado] = useState(null)
  const [action, setAction] = useState('C');

  //HOOK useEffect
  useEffect(() => {
    cargarEmpleados()
  }, [])

  const cargarEmpleados = async function (filtro) {
    const empleados = await getEmpleados(filtro)
    setFilas(empleados)
  }

  //Recibimos solo un filtro, no un objeto de filtros
  const onConsultar = (filtro) => {
    setAction('C')
    cargarEmpleados(filtro)
  }
  const onNuevo = (idEmpleado) => {
    setIdEmpleado(idEmpleado)
    setAction('N')
  }

  const onCancelar = () => {
    setAction('C')
    cargarEmpleados()
  }

  const onConfirmar = async (empleado) => {
    await saveEmpleado(empleado);
    await cargarEmpleados()
    setAction('C')
  }

  const onDelete = async(idEmpleado) => {
    await deleteEmpleado(idEmpleado)
    await cargarEmpleados()
    setAction('C')
  }

  return (    
    <>
      {action === 'C' && (
        <div>
          <FiltroEmpleados onConsultar={onConsultar}></FiltroEmpleados>
          <TablaEmpleados items={filas} onClickNuevo={onNuevo} onClickDelete={onDelete}></TablaEmpleados>
        </div>
      )}

      {action === 'N' && (
          <div>
            <EditarEmpleado onCancelar={onCancelar} onConfirmar={onConfirmar} empleadoId={idEmpleado} />
          </div>
        )
      }
      <button onClick={props.clickInicio}
      className='btn btn-success'
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