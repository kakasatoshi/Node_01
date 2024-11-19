// const path = require("path");

// const express = require("express");

const Genre = require("../Models/Genre");

exports.getGenres = (req, res, next) => {
  // Genre.all((genre) => {
  //   res.json(genre);
  // });
  res.json(Genre.all());
  // Genre.all();
};
