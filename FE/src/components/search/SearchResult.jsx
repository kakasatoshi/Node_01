import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import "./SearchResult.css";

const base_url = "https://image.tmdb.org/t/p/original";

const SearchResult = ({ query }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (
        !query.keyword &&
        !query.genre &&
        !query.mediaType &&
        !query.language &&
        !query.year
      ) {
        setMovies([]);
        return;
      }

      const url = `/search-advanced?keyword=${query.keyword || ""}&genre=${
        query.genre || ""
      }&mediaType=${query.mediaType || ""}&language=${
        query.language || ""
      }&year=${query.year || ""}`;
      try {
        const request = await axios.get(url);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMovies([]);
      }
    }

    fetchData();
  }, [query]);

  return (
    <div className="row">
      <h2>Search Result</h2>
      <div className="row_posters search-resul-container sc2">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="row_poster row_posterLarge"
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name || movie.title}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
