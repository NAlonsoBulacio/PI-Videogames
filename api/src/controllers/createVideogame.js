const { Videogame } = require('../db')

const createVideogame = async (Nombre, Descripción, Plataformas, Imagen, Fecha_de_lanzamiento, Rating, Generos) => {
    return await Videogame.create({ Nombre, Descripción, Plataformas, Imagen, Fecha_de_lanzamiento, Rating, Generos });
  };

module.exports = {createVideogame};