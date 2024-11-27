const API_KEY = "504b85f6fe0a10a9c7f35945e14e7ddf";

const requests = {
  // fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTrending: `/trending`,

  fetchNetflixOriginals: `/top-rate`,
  fetchTopRated: `/top-rate`,
  fetchActionMovies: `/discover?genre=28&page=1`,
  fetchComedyMovies: `/discover?genre=35&page=1`,
  fetchHorrorMovies: `/discover?genre=27&page=1`,
  fetchRomanceMovies: `/discover?genre=10749&page=1`,
  fetchDocumentaries: `/discover?genre=99&page=1`,
  fetchSearch: `/search`,
};

export default requests;
