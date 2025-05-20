if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");


// TODO: Add your code here
app.use('/movies', moviesRouter);
app.use('/theaters', theatersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
