import React, { useState } from "react";

const AdvancedSearch = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [genre, setGenre] = useState("");
  const [mediaType, setMediaType] = useState("all");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");

  const handleSearch = () => {
    onSearch({ keyword, genre, mediaType, language, year });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
      />
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="18">Drama</option>
        {/* Add more genres */}
      </select>
      <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
        <option value="all">All</option>
        <option value="movie">Movies</option>
        <option value="tv">TV Shows</option>
        <option value="person">Persons</option>
      </select>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
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
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default AdvancedSearch;
