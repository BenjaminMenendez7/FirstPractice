import * as sqlite3 from 'sqlite3';

// Codigo de creacion de la base de datos
const db = new sqlite3.default.Database("./data/Grupo11DB.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log(err.message);
    }
})

export default db;
