,const path = require("path");

const express = require("express");
// const movieController = require("../controllers/movieController");
const genreController = require("../controllers/genreController");
const movieController=require("../controllers/movieController");

const router = express.Router();

router.get("/genre", genreController.getGenres);
router.get("/trending",movieController.getTrending);

module.exports = router;