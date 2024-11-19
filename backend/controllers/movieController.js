const Movies = require("../Models/Movies");
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

const Genres = require("../Models/Genre"); // Danh sách thể loại phim

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
