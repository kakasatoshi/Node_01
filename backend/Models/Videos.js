const fs = require("fs");
const path = require("path");

// Đường dẫn tới file movieList.json
const DATA_PATH = path.join(__dirname, "../data/videoList.json");

const Videos = {
  all: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  },
};

module.exports = Videos;
