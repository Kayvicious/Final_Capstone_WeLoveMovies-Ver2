if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

// TODO: Add your code here
app.use('/theaters', theatersRouter);
module.exports = app;
