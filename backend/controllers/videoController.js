const Video = require("../Models/Videos");

exports.getVideos = (req, res, next) => {
  // Genre.all((genre) => {
  //   res.json(genre);
  // });
  res.json(Video.all());
  // Genre.all();
};
