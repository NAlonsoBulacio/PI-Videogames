const axios = require("axios");
const { Genres } = require('../db')
require('dotenv').config();
const {
    API_KEY
  } = process.env;

getGenresController = async() => {
   try {let genres = await Genres.findAll();
    if(genres.length === 0){
    const apiResponse = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const apiGenres = apiResponse.data.results;
     genres = apiGenres.map((genre) => (
        {
            id: genre.id,
            Nombre: genre.name
        }
    ));
    await Genres.bulkCreate(genres);}

    return genres;
}catch(error){
    throw new Error('Hubo un problema al obtener los generos.');
}
}

module.exports = { getGenresController }