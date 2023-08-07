const Sequelize = require("sequelize");
const fs = require("fs");

const sequelize = new Sequelize('Grupo11DB.db', '','',{
    dialect:'sqlite',
    storage: './data/Grupo11DB.db'
})

const syncDB = async function() {
    try {
        await fs.access("./data/Grupo11DB.db", (async function () {
            try {
                await sequelize.sync().then(() => {
                    console.log("DB OK - Sincronizada");
                })
            } catch (error) {
                console.log("DB ERROR -", error)
            }
        }))
    } catch (error) {
        console.log("DB ERROR - No se encontro la base de datos -", error)
    }
}

module.exports = {sequelize, syncDB}