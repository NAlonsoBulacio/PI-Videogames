const { Videogame } = require('../db')
const axios = require("axios");
require('dotenv').config();
const {
    API_KEY
  } = process.env;

const getVideogameById = async(id, source) => {
  let videogame;
  if(source === 'api'){
    let response = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data

    videogame = {
      id: response.id,
      Nombre: response.name,
      Imagen: response.background_image,
      Fecha_de_lanzamiento: response.released,
      Descripción: response.description_raw,
      Rating: response.rating,
      Plataformas: response.platforms.map((plataforma) => plataforma.platform.name),
      Generos: response.genres.map((genre) => genre.name)
  };
}
else {
  videogame = await Videogame.findOne({ where: { id } });
}
  
  return videogame;
}

const getVideogames = async (Nombre) => {
  try {
    const bddVideojuegos =  await Videogame.findAll();
    const apiurls = [];

    for (let i = 0; i < 5; i++) {
      const url = `https://api.rawg.io/api/games?key=a7dbfb5fbdb94750a31f7a5935c10667&page=${i + 1}`;
      apiurls.push(url);
    }

    let responses = await axios.all(apiurls.map((url) => axios.get(url)));
  
    let results = responses.flatMap((response) => response.data.results);

    let api = results.map((result) => ({
      id: result.id,
      Nombre: result.name,
      Imagen: result.background_image,
      Fecha_de_lanzamiento: result.released,
      Rating: result.rating,
      Plataformas: result.platforms.map((plataforma) => plataforma.platform.name),
      Generos: result.genres.map((genre) => genre.name)
    }));

  if(Nombre !== undefined){

    const videojuegosfiltrados = api.filter((videojuego) => videojuego.Nombre.toLowerCase().includes(Nombre.toLowerCase()))
    const first15 = videojuegosfiltrados.slice(0, 15);
    console.log(first15.length);
    return api = [...first15];
  }
  else{
      return api = [...api, ...bddVideojuegos];
    }

  } catch (error) {
    console.error('Error al obtener los videojuegos:', error);
    throw new Error('Hubo un problema al obtener los videojuegos.');
  }
};

module.exports = {
  getVideogameById, 
  getVideogames
}