const users = require("../Models/Users"); // Đường dẫn tới file userToken.json

const authenticate = (req, res, next) => {
  const token =
    req.headers["authorization"] || req.body.token || req.query.token; // Token truyền qua Header

  // Kiểm tra token có tồn tại không
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Tìm user theo token
  const user = users.all().find((u) => u.token === token);

  // Kiểm tra nếu không tìm thấy user
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Gắn user vào request để các route khác sử dụng
  req.user = user;
  next(); // Tiếp tục xử lý route
};

module.exports = authenticate;
