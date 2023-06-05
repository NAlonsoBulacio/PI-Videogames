const express = require('express');
const router = express.Router();

const {
  getVideogamesHandler,
  getVideogameByIdHandler,
  createVideogameHandler
} = require('../handlers/videogamesHandlers')


router.get('/', getVideogamesHandler);

router.get('/:id', getVideogameByIdHandler);

router.post('/', createVideogameHandler)

module.exports = router;