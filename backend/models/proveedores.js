const { sequelize } = require("../data/config.js");
const DataTypes = require("sequelize");

const Proveedor = sequelize.define(
    "Proveedores",
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        nombre: { 
            type: DataTypes.STRING, 
            allowNull: false
        },
        email: { 
            type: DataTypes.STRING, 
            allowNull: false
        },
        telefono: { 
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        fechaIng: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false
    }
);

module.exports = { Proveedor }