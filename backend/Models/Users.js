// module.exports = class User {
//   constructor(id, token) {
//     this.id = id;
//     this.token = token;
//   }
// };

const fs = require("fs");
const path = require("path");

// Đường dẫn tới file movieList.json
const DATA_PATH = path.join(__dirname, "../data/userList.json");

const Users = {
  all: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  },
};

module.exports = Users;
