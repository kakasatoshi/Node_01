const path = require("path");

const express = require("express");
// const movieController = require("../controllers/movieController");
const genreController = require("../controllers/genreController");
const movieController = require("../controllers/movieController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/genre", genreController.getGenres); //http://localhost:5000/api/movie/genre
// router.get("/genre", authenticate, genreController.getGenres); //http://localhost:5000/api/movie/genre
router.get("/trending", movieController.getTrending); //http://localhost:5000/api/movie/trending
router.get("/discover", movieController.discoverMoviesByGenre); //http://localhost:5000/api/movie/discover?genre=28&page=1
router.post("/video", movieController.getMovieTrailer); //http://localhost:5000/api/movie/video?film_id=361743
router.get("/video", movieController.getMovieTrailer);
router.get("/top-rate", movieController.getTopRatedMovies);
router.post("/search", authenticate, movieController.searchMovies); //http://localhost:5000/api/movie/search body {   "keyword": "top",    "page": 1,    "limit": 5}

router.get("/search-advanced", movieController.advancedSearch);
// router.get("/search-advanced", authenticate, movieController.advancedSearch);

module.exports = router;
