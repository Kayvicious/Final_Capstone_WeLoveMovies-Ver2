if (process.env.USER) require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");


// TODO: Add your code here
app.use(cors());
app.use(express.json());
app.use('/movies', moviesRouter);
app.use('/theaters', theatersRouter);
app.use('/reviews', reviewsRouter )

app.use(notFound);
app.use(errorHandler);

const { PORT = 5001 } = process.env;

const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);

module.exports = app;
