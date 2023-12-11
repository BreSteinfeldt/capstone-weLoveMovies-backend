const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const addMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    description: ["movies", null, "description"], 
    image_url: ["movies", null, "image_url"], 
    created_at: ["movies", null, "created_at"], 
    updated_at: ["movies", null, "updated_at"],
    is_showing: ["movies_theaters", null, "is_showing"], 
    theater_id: ["movies_theaters", null, "theater_id"],
  });

  function list(){
    return knex("theaters")
     .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
     .join("movies", "movies_theaters.movie_id", "movies.movie_id")
     .select("*")
     .then(addMovies)
  }

  module.exports = {
    list, 
  }