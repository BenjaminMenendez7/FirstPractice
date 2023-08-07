const { DataTypes } = require("sequelize");
const { sequelize } = require("../data/config.js")

const Venta = sequelize.define(
    "Ventas",
    {
        idVenta: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descVenta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaVenta: {
            type: DataTypes.DATE,
            allowNull: false
        },
        idProveedor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idCliente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idEmpleado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idProducto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false
    }
);

module.exports = { Venta }