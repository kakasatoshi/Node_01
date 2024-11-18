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

// Import module chứa dữ liệu (Movies)
// const Movies = require("../Data/Movies");

// // Hàm tìm các phim có `genre_ids` chứa giá trị `y`
// function findMoviesByGenre(y) {
//     // Lấy toàn bộ danh sách phim
//     const movies = Movies.all();

//     // Lọc các phim có chứa `genre_id = y`
//     const filteredMovies = movies.filter(movie => movie.genre_ids.includes(y));

//     return filteredMovies;
// }

// // Ví dụ: Tìm các phim thuộc thể loại `genre_id = 28` (Action)
// const actionMovies = findMoviesByGenre(28);
// console.log(actionMovies);
