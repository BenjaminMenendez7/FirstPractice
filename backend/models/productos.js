// archivo en donde se definen todos los modelos (tablas de la BD).
const { sequelize } = require("../data/config.js");
const DataTypes = require("sequelize");

const Producto = sequelize.define(
    "Productos",
    {
      IdProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nombre: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Nombre es requerido",
          },
          len: {
            args: [5, 60],
            msg: "Nombre debe ser tipo caracteres, entre 5 y 60 de longitud",
          },
        },
        unique: {
          args: true,
          msg: "este Nombre ya existe en la tabla!",
        },
      },
      Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Precio es requerido",
          }
        }
      },
      FechaAlta: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Fecha Alta es requerido",
          }
        }
      },
      Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Activo es requerido",
          }
        }
      },
    },
    {
        // pasar a mayusculas
        hooks: {
          beforeValidate: function (articulo, options) {
            if (typeof articulo.Nombre === "string") {
              articulo.Nombre = articulo.Nombre.toUpperCase().trim();
            }
          },
        },
        sequelize,
        timestamps: false,
      }
    );
    
  
module.exports = { Producto };
  