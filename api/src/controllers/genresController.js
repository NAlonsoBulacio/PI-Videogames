const axios = require("axios");
const { Genres } = require('../db')

getGenresController = async() => {
   try {let genres = await Genres.findAll();
    if(genres.length === 0){
    const apiResponse = await axios.get('https://api.rawg.io/api/genres?key=a7dbfb5fbdb94750a31f7a5935c10667');
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