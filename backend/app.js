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

app.use("/api/movie", movieRoutes);
// app.get("/", (req, res) => {
//   res.send("Hello from Node.js Backend!");
// });
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
