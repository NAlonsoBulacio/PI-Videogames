const express = require('express');
const router = express.Router();
const { getGenresHandler } = require('../handlers/genresHandler')

router.get('/', getGenresHandler);

module.exports = router;