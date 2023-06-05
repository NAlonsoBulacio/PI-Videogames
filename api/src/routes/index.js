const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getVideogames = require('./getVideogames')
const getGenres = require('./getGenres')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', getVideogames);
router.use('/genres', getGenres);

module.exports = router;
