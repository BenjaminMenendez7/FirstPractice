//modulo de partida,  de aca arranca la API
const express = require('express');
const cors = require('cors');
const configDB = require("./data/config.js");
const app = express()
const port = 3001;

app.use(express.json())
app.use(cors());


app.use('/api', require('./routes/productos.js'))
app.use('/api', require('./routes/clientes.js'))
app.use('/api', require('./routes/empleados.js'))
app.use('/api', require('./routes/proveedores.js'))
app.use('/api', require('./routes/ventas.js'))

const runApp = async function () {
    await configDB.syncDB()
    app.listen(port, () => {
        console.log("Api activa Grupo 11 3K6 en Puerto:", port);
    })
}
runApp();

