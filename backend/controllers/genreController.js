// const path = require("path");

// const express = require("express");

const Genre = require("../Models/Genre");

exports.getGenres = (req, res, next) => {
  Genre.fetchAll((genre) => {
    res.json(genre);
  });
};
