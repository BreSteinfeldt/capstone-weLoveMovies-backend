const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCategory = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});


function reviewsList(movieId){
    return knex("movies")
     .join("reviews", "movies.movie_id", "reviews.movie_id")
     .join("critics", "reviews.critic_id", "critics.critic_id")
     .where({"movies.movie_id": movieId})
     .then((data) => data.map ((critic) => addCategory(critic)))
}


function list(is_showing) {
  if (is_showing) {
    return knex("movies")
      .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
      .where({ "movies_theaters.is_showing": true })
      .groupBy("movies.movie_id");
  } else {
    return knex("movies").select("*");
  }
}

function read(movieId) {
  return knex("movies").select("movies.*").where({ movie_id: movieId }).first();
}

function theatersList(movieId) {
  return knex("theaters")
    .join(
      "movies_theaters",
      "theaters.theater_id",
      "movies_theaters.theater_id"
    )
    .select("theaters.*")
    .where({ "movies_theaters.movie_id": movieId });
}

module.exports = {
  list,
  read,
  theatersList,
  reviewsList,
};
