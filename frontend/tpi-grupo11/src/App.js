
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ventas from './components/ventas/ventas.jsx';
import Proveedores from './components/proveedores/proveedores.jsx';
import Productos from './components/productos/productos.jsx';
import Empleados from './components/empleados/empleados.jsx';
import Clientes from './components/clientes/clientes.jsx';

function App() {
  // Componente en el cual estamos parados ahora es el 'Home' o el inicio.
  const [componente, setComponente] = useState('Home');

  const onClickButtonClientes = () => {
    // Lógica que se ejecutará al presionar el botón del componente instanciandolo
    // Por ejemplo, Se setea el componente a 'Ven' haciendo referencia a ventas.
    setComponente('Cli')
    console.log(`¡Se presionó el botón del componente Cli!`);
  };
  const onClickButtonEmpleados = () => {
    setComponente('Emp')
    console.log(`¡Se presionó el botón del componente Emp!`);
  };
  const onClickButtonProductos = () => {
    setComponente('Prd')
    console.log(`¡Se presionó el botón del componente Prd!`);
  };
  const onClickButtonProveedores = () => {
    setComponente('Prv')
    console.log(`¡Se presionó el botón del componente Prv!`);
  };
  const onClickButtonVentas = () => {
    setComponente('Ven')
    console.log(`¡Se presionó el botón del componente Ven!`);
  };
  const onClickButtonHome = () => {
    setComponente('Home')
    console.log(`¡Se presionó el botón del inicio!`);
  };

  return (
    <div>
      {componente === 'Home' && (<div className="d-flex flex-column align-items-center">
        <h1 className='mt-4 text-primary'>Trabajo Práctico DDS 2023</h1>
        <div className="btn-group mt-4 mb-4" role="group">
          <button type="button" className="btn btn-danger" onClick={onClickButtonClientes}>Clientes</button>
          <button type="button" className="btn btn-success" onClick={onClickButtonEmpleados}>Empleados</button>
          <button type="button" className="btn btn-primary" onClick={onClickButtonProductos}>Productos</button>
          <button type="button" className="btn btn-warning" onClick={onClickButtonProveedores}>Proveedores</button>
          <button type="button" className="btn" style={{ backgroundColor: 'purple', color: 'white' }} onClick={onClickButtonVentas}>Ventas</button>
        </div>
        <p className="small">Böhm, Marc 75184 - Rovezzi, Alexis 79448 - Menéndez, Benjamín 88147 - Pero, Luca 87455 - Barahona, Abel 48739</p>
      </div>)}
      {componente === 'Cli' && (<Clientes clickInicio={onClickButtonHome} />)}
      {componente === 'Emp' && (<Empleados clickInicio={onClickButtonHome} />)}
      {componente === 'Prd' && (<Productos clickInicio={onClickButtonHome} />)}
      {componente === 'Prv' && (<Proveedores clickInicio={onClickButtonHome} />)}
      {componente === 'Ven' && (<Ventas clickInicio={onClickButtonHome} />)}
    </div>
  );
}

export default App;
