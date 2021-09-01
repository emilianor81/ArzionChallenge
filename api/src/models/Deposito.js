const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
 sequelize.define("deposito", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  limite: {
    type: DataTypes.INTEGER,
  }, 
  stock: {
    type: DataTypes.INTEGER,
  },
  direccion: {
    type: DataTypes.STRING,
  }

});
}