const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "Data",
  "MovieList.js"
);

module.exports= class Movie {
    constructor({
        adult = false,
        backdrop_path = "",
        id = null,
        title = "",
        original_language = "en",
        original_title = "",
        overview = "",
        poster_path = "",
        media_type = "movie",
        genre_ids = [],
        popularity = 0,
        release_date = "",
        video = false,
        vote_average = 0,
        vote_count = 0,
    } = {}) {
        this.adult = adult;
        this.backdropPath = backdrop_path;
        this.id = id;
        this.title = title;
        this.originalLanguage = original_language;
        this.originalTitle = original_title;
        this.overview = overview;
        this.posterPath = poster_path;
        this.mediaType = media_type;
        this.genreIds = genre_ids;
        this.popularity = popularity;
        this.releaseDate = release_date;
        this.video = video;
        this.voteAverage = vote_average;
        this.voteCount = vote_count;
    }

    // Method to get the full URL for the poster image
    getPosterUrl(baseUrl = "https://image.tmdb.org/t/p/w500") {
        return `${baseUrl}${this.posterPath}`;
    }

    // Method to get the full URL for the backdrop image
    getBackdropUrl(baseUrl = "https://image.tmdb.org/t/p/w1280") {
        return `${baseUrl}${this.backdropPath}`;
    }

    // Method to get a brief overview
    getBriefOverview(maxLength = 100) {
        return this.overview.length > maxLength
            ? `${this.overview.slice(0, maxLength)}...`
            : this.overview;
    }

    // Method to get genre names (mock mapping for demonstration)
    getGenreNames(genreMap = { 28: "Action", 18: "Drama" }) {
        return this.genreIds.map((id) => genreMap[id] || "Unknown");
    }
}

