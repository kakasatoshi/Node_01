// const { json } = require("body-parser");
// const fs = require("fs");
// const path = require("path");
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "Data",
//   "genreList.json"
// );

// const getGenresFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       // const genres = JSON.parse(fileContent.toString());
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// module.exports = class Genre {
//   constructor(id, name) {
//     this.id = id;
//     this.name = name;
//   }
//   static fetchAll(cb) {
//     getGenresFromFile(cb);
//   }

//   static findById(id, cb) {
//     getGenresFromFile((genres) => {
//       const genre = genres.find((g) => g.id === id);
//       cb(genre);
//     });
//   }
// };

const fs = require("fs");
const path = require("path");

// Đường dẫn tới file movieList.json
const DATA_PATH = path.join(__dirname, "../data/genreList.json");

const Genres = {
  all: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  },
};

module.exports = Genres;
