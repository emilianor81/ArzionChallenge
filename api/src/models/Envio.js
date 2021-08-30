const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
 sequelize.define("envio", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  destinatario: {
    type: DataTypes.STRING,
  },
  destino: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.STRING,
  },
  costo: {
    type: DataTypes.INTEGER,
  }
});
}