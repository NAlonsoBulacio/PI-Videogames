const { Sequelize, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Videogame = sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripción: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Plataformas: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
      get() {
        const platforms = this.getDataValue('Plataformas');
        return platforms ? platforms : [];
      },
      set(value) {
        if (Array.isArray(value)) {
          this.setDataValue('Plataformas', value);
        } else {
          this.setDataValue('Plataformas', []);
        }
      },
      field: 'Plataformas',
      // Añade esta opción para especificar la transformación de tipo
      // adaptada a la base de datos PostgreSQL.
      // Puede ser necesario ajustarla según las necesidades de tu base de datos.
      // Si utilizas otro motor de base de datos, es posible que debas ajustar esta opción.
      set: function (value) {
        if (Array.isArray(value)) {
          this.setDataValue('Plataformas', value.join(','));
        } else {
          this.setDataValue('Plataformas', value);
        }
      },
      get: function () {
        const value = this.getDataValue('Plataformas');
        if (typeof value === 'string') {
          return value.split(',');
        }
        return value;
      },
    },
    Imagen: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Fecha_de_lanzamiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Generos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    creadoEnDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
  return Videogame;
};
