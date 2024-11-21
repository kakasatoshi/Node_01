import axios from "axios";

/** base url to make request to the themoviedatabase */

const instance = axios.create({
  // baseURL: 'https://api.themoviedb.org/3'
  baseURL: "http://localhost:5000/api/movie",
});

// instance.get('/foo-bar');
// https://api.themoviedb.org/3/foo-bar

export default instance;
