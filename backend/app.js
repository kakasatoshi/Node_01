const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const dotenv = require("dotenv");

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const movieRoutes = require("./routes/movie");
// const userRoutes = require("./routes/user");
// const genreRoutes = require("./routes/genre");

app.use("api/movies", movieRoutes);
// app.get("/", (req, res) => {
//   res.send("Hello from Node.js Backend!");
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
