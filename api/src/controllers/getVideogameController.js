const { Videogame } = require('../db')
const axios = require("axios");

const getVideogameById = async(id, source) => {
  let videogame;
  if(source === 'api'){
    let response = (await axios.get(`https://api.rawg.io/api/games/${id}?key=a7dbfb5fbdb94750a31f7a5935c10667`)).data

    videogame = {
      id: response.id,
      Nombre: response.name,
      Imagen: response.background_image,
      Fecha_de_lanzamiento: response.released,
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
    const apiurls = Array.from(
      { length: 5},
      (_, i) => `https://api.rawg.io/api/games?key=a7dbfb5fbdb94750a31f7a5935c10667&page=${i + 1}`
    );

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

    // const apiResponse = await axios.get('https://api.rawg.io/api/games?key=a7dbfb5fbdb94750a31f7a5935c10667');
    // const apiVideojuegos = apiResponse.data.results;




module.exports = {
  getVideogameById, 
  getVideogames
}