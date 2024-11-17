const path = require("path");

const express = require("express");
// const movieController = require("../controllers/movieController");
const genreController = require("../controllers/genreController");

const router = express.Router();

router.get("/genre", genreController.getGenres);

module.exports = router;
