const { DataTypes } = require("sequelize");
const { sequelize } = require("../data/config.js")

const Clientes = sequelize.define(
    "Clientes",
    {
        idCliente: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaDeAlta: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dni: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false
    }
);

module.exports = { Clientes }