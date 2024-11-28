import React, { useState, useEffect } from "react";
import Nav from "../../components/browse/Nav";
import SearchResult from "../../components/search/SearchResult";
import "./Search.css";
import AdvancedSearch from "../../components/search/AdvancedSearch";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
const Search = () => {
  const [query, setQuery] = useState("");
  const [keyword, setKeyword] = useState("");
  // const [searchCriteria, setSearchCriteria] = useState("keyword"); // Tiêu chí mặc định
  const [genre, setGenre] = useState("");
  const [mediaType, setMediaType] = useState("all");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.genre);
      // console.log(axios, fetchUrl);
      console.log(request.data);
      setGenres(request.data);
      return request;
    }
    fetchData();
  }, []);

  const handleSearch = () => {
    console.log(axios, query);
    setQuery({
      keyword,
      genre,
      mediaType,
      language,
      year,
    });
  };

  const resetSearch = () => {
    setQuery("");
    setKeyword("");
  };

  return (
    <div className="app">
      <Nav />
      <div className="s009">
        <form>
          <div className="inner-form">
            <div className="basic-search">
              <div className="input-field">
                <input
                  type="text"
                  placeholder={`Enter keyword`}
                  onChange={(e) => setKeyword(e.target.value)}
                  value={keyword}
                />
                <div className="icon-wrap">
                  <svg
                    className="svg-inline--fa fa-search fa-w-16"
                    fill="#ccc"
                    aria-hidden="true"
                    data-prefix="fas"
                    data-icon="search"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="advance-search">
              <div className="row">
                {/* <label>
                  <input
                    type="radio"
                    value="keyword"
                    checked={searchCriteria === "keyword"}
                    onChange={(e) => setSearchCriteria(e.target.value)}
                  />
                  Movie Name
                </label>
                <label>
                  <input
                    type="radio"
                    value="genre"
                    checked={searchCriteria === "genre"}
                    onChange={(e) => setSearchCriteria(e.target.value)}
                  />
                  Genre
                </label>
                <label>
                  <input
                    type="radio"
                    value="mediaType"
                    checked={searchCriteria === "mediaType"}
                    onChange={(e) => setSearchCriteria(e.target.value)}
                  />
                  Media Type
                </label>
                <label>
                  <input
                    type="radio"
                    value="language"
                    checked={searchCriteria === "language"}
                    onChange={(e) => setSearchCriteria(e.target.value)}
                  />
                  Language
                </label>
                <label>
                  <input
                    type="radio"
                    value="year"
                    checked={searchCriteria === "year"}
                    onChange={(e) => setSearchCriteria(e.target.value)}
                  />
                  Year
                </label> */}
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
                <select
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="movie">Movies</option>
                  <option value="tv">TV Shows</option>
                  <option value="person">Persons</option>
                </select>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="">All Languages</option>
                  <option value="en">English</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                </select>
                <input
                  type="number"
                  placeholder="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="row third">
                <div className="input-field">
                  <div className="group-btn">
                    <button
                      className="btn-delete"
                      onClick={resetSearch}
                      type="button"
                    >
                      RESET
                    </button>
                    <button
                      className="btn-search"
                      type="button"
                      onClick={handleSearch}
                    >
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* <AdvancedSearch /> */}
      <SearchResult query={query} />
    </div>
  );
};

export default Search;
