const Movies = require("../Models/Movies");
const Genres = require("../Models/Genre");
const Videos = require("../Models/Videos"); // Danh sách thể loại phim // Danh sách thể loại phim
exports.getTrending = (req, res, next) => {
  const { page = 1 } = req.query; // Lấy tham số `page` từ request (mặc định là 1)
  const moviesPerPage = 20; // Số phim mỗi trang

  // Lấy danh sách phim trending
  const trendingMovies = Movies.all().sort(
    (a, b) => b.popularity - a.popularity
  );

  // Tính toán paging
  const totalMovies = trendingMovies.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);
  const currentPage = Math.max(1, Math.min(page, totalPages)); // Đảm bảo `page` nằm trong phạm vi hợp lệ

  // Lấy danh sách phim cho trang hiện tại
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const results = trendingMovies.slice(startIndex, endIndex);

  // Trả về response
  res.status(200).json({
    results,
    page: currentPage,
    total_pages: totalPages,
  });
};

exports.discoverMoviesByGenre = (req, res, next) => {
  const { genre, page = 1 } = req.query; // Lấy `genre` và `page` từ request query

  try {
    // Kiểm tra đầu vào
    if (!genre || isNaN(genre)) {
      return res.status(400).json({ message: "Invalid or missing genre ID" });
    }

    const genreId = Number(genre);
    const currentPage = Math.max(1, Number(page));
    const moviesPerPage = 20;

    // Lấy danh sách phim và thể loại
    const movies = Movies.all();
    const genreObj = Genres.all().find((g) => g.id === genreId);

    if (!genreObj) {
      return res.status(404).json({ message: "Genre not found" });
    }

    // Lọc phim theo thể loại
    const filteredMovies = movies.filter((movie) =>
      movie.genre_ids?.includes(genreId)
    );

    // Tính tổng số trang và lấy phim của trang hiện tại
    const totalMovies = filteredMovies.length;
    const totalPages = Math.ceil(totalMovies / moviesPerPage);
    const startIndex = (currentPage - 1) * moviesPerPage;
    const results = filteredMovies.slice(
      startIndex,
      startIndex + moviesPerPage
    );

    // Trả về response
    res.status(200).json({
      results,
      page: currentPage,
      total_pages: totalPages,
      genre_name: genreObj.name,
    });
  } catch (error) {
    next(error); // Xử lý lỗi
  }
};

exports.getMovieTrailer = (req, res, next) => {
  const { film_id } = req.query; // Lấy film_id từ route parameter
  // const { film_id } = req.params;

  console.log(req, "film_id,req");

  // Kiểm tra nếu không có `film_id`
  if (!film_id) {
    return res.status(400).json({ message: "Not found film_id parram" });
  }

  // Tìm phim theo `film_id`
  const film = Videos.all().find((movie) => movie.id === Number(film_id));
  if (!film) {
    return res.status(404).json({ message: "Not found video" });
  }

  // Lọc các video thỏa mãn điều kiện
  const eligibleVideos = film.videos.filter(
    (video) =>
      video.official === true &&
      video.site === "YouTube" &&
      (video.type === "Trailer" || video.type === "Teaser")
  );

  // Nếu không có video phù hợp, trả về lỗi 404
  if (eligibleVideos.length === 0) {
    return res.status(404).json({ message: "Not found video" });
  }

  // Sắp xếp video theo thời gian `published_at` (mới nhất trước)
  eligibleVideos.sort(
    (a, b) => new Date(b.published_at) - new Date(a.published_at)
  );

  // Trả về video phù hợp nhất
  res.status(200).json(eligibleVideos[0]);
};

exports.searchMovies = (req, res, next) => {
  const { keyword, page = 1, limit = 10 } = req.body;

  // Kiểm tra nếu không có `keyword`
  if (!keyword) {
    return res.status(400).json({ message: "Not found keyword parram" });
  }

  // Tìm kiếm nội dung thỏa mãn
  const lowerKeyword = keyword.toLowerCase();
  const filteredContent = Movies.all().filter((content) => {
    const titleOrName =
      content.media_type === "movie" ? content.title : content.name;

    return (
      titleOrName.toLowerCase().includes(lowerKeyword) ||
      content.overview.toLowerCase().includes(lowerKeyword)
    );
  });

  // Phân trang
  const startIndex = (page - 1) * limit;
  const paginatedContent = filteredContent.slice(
    startIndex,
    startIndex + limit
  );

  // Trả về kết quả
  res.status(200).json({
    page: Number(page),
    totalResults: filteredContent.length,
    totalPages: Math.ceil(filteredContent.length / limit),
    results: paginatedContent,
  });
};

exports.getTopRatedMovies = (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Mặc định page = 1
  const itemsPerPage = 10; // Số lượng phim mỗi trang

  // Lấy toàn bộ danh sách phim
  const allMovies = Movies.all();

  // Sắp xếp phim theo `vote_average` giảm dần
  const sortedMovies = allMovies.sort(
    (a, b) => b.vote_average - a.vote_average
  );

  // Lấy các phim thuộc trang hiện tại
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const moviesForPage = sortedMovies.slice(startIndex, endIndex);

  // Kiểm tra nếu không có dữ liệu
  if (moviesForPage.length === 0) {
    return res.status(404).json({
      message: "No movies found for the given page.",
    });
  }

  // Trả về kết quả
  res.status(200).json({
    page: page,
    results: moviesForPage,
    total_results: sortedMovies.length,
    total_pages: Math.ceil(sortedMovies.length / itemsPerPage),
  });
};

exports.advancedSearch = (req, res, next) => {
  const { keyword, genre, mediaType, language, year } = req.body;

  // Kiểm tra keyword (bắt buộc)
  if (!keyword || keyword.trim() === "") {
      return res.status(400).json({ message: "Not found keyword param" });
  }

  // Lấy toàn bộ danh sách phim
  const allMovies = Movies.all();

  // Tìm kiếm theo keyword (title hoặc overview, không phân biệt hoa thường)
  let filteredMovies = allMovies.filter(
      (movie) =>
          movie.title.toLowerCase().includes(keyword.toLowerCase()) ||
          (movie.overview && movie.overview.toLowerCase().includes(keyword.toLowerCase()))
  );

  // Lọc theo genre (nếu có)
  if (genre) {
      filteredMovies = filteredMovies.filter(
          (movie) => movie.genre_ids && movie.genre_ids.includes(Number(genre))
      );
  }

  // Lọc theo mediaType (nếu có)
  if (mediaType && mediaType !== "all") {
      filteredMovies = filteredMovies.filter(
          (movie) => movie.media_type && movie.media_type === mediaType
      );
  }

  // Lọc theo language (nếu có)
  if (language) {
      filteredMovies = filteredMovies.filter(
          (movie) => movie.original_language && movie.original_language === language
      );
  }

  // Lọc theo năm phát hành (nếu có)
  if (year) {
      filteredMovies = filteredMovies.filter((movie) =>
          movie.release_date ? movie.release_date.startsWith(year.toString()) : false
      );
  }

  // Kiểm tra nếu không có kết quả
  if (filteredMovies.length === 0) {
      return res.status(404).json({ message: "No movies found with the given filters." });
  }

  // Trả về kết quả
  res.status(200).json({
      results: filteredMovies,
      total_results: filteredMovies.length,
  });
};