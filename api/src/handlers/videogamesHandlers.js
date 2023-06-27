const { Videogame, Genres } = require('../db');
const { createVideogame } = require('../controllers/createVideogame')
const { getVideogameById, getVideogames } = require('../controllers/getVideogameController')
const { Op } = require('sequelize');

const getVideogamesHandler = async(req, res) => {
    const { Nombre } = req.query
    if(Nombre !== undefined){
      try{const videojuegosByName = await getVideogames(Nombre);
        res.status(200).json(videojuegosByName)
      }catch(error){
        res.status(400).json({ error: error.message})
      }
    }
    else{
    try {
      const videojuegos = await getVideogames()
      res.status(200).json(videojuegos);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Hubo un problema al obtener los videojuegos.' });
    }
  }}
  

  const getVideogameByIdHandler = async(req, res) => {
    const { id } = req.params
    let source;
    if (isNaN(id)) {
      source = 'bdd';
    } else {
      source = 'api';
    }
    try{
      const videogame = await getVideogameById(id, source);
      console.log(videogame);
      res.status(200).json(videogame);
    }catch(error){
      res.status(400).json({error: error.message});
    }
    };
  
    const createVideogameHandler = async (req, res) => {
      try {
        const { Nombre, Descripción, Plataformas, Imagen, Fecha_de_lanzamiento, Rating, Generos } = req.body;
        const videogameCreado = await createVideogame(Nombre, Descripción, Plataformas, Imagen, Fecha_de_lanzamiento, Rating, Generos);
        const genresDB= await Genres.findAll({
          where:{
              Nombre:{
                  [Op.in]: Generos
              }
          }
      })
      await videogameCreado.addGenres(genresDB)
      const genres = await videogameCreado.getGenres();
      console.log(genres);
        res.status(201).json({ message: 'Videojuego creado exitosamente', videogameCreado: videogameCreado});
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };

    module.exports = {
        getVideogamesHandler,
        getVideogameByIdHandler,
        createVideogameHandler
    }