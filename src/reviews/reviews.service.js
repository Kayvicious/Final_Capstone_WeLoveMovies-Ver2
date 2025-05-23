const db = require("../db/connection");

const tableName = "reviews";

async function destroy(reviewId) {
  // TODO: Write your code here
    return db(tableName).where({ review_id: reviewId }).del()
}

/*async function list(movie_id) {
  // TODO: Write your code here
  return db(tableName) 
    .select('*')
    .modify((queryBuilder) => {
      if (movie_id) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}*/
async function list(movieId) {
  const rows = await db("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id",
      "c.critic_id as critic_critic_id",
      "c.preferred_name as critic_preferred_name",
      "c.surname as critic_surname",
      "c.organization_name as critic_organization_name",
      "c.created_at as critic_created_at",
      "c.updated_at as critic_updated_at"
    )
    .where({ "r.movie_id": movieId });

  return rows.map(row => {
    const {
      critic_critic_id,
      critic_preferred_name,
      critic_surname,
      critic_organization_name,
      critic_created_at,
      critic_updated_at,
      ...review
    } = row;

    return {
      ...review,
      critic: {
        critic_id: critic_critic_id,
        preferred_name: critic_preferred_name,
        surname: critic_surname,
        organization_name: critic_organization_name,
        created_at: critic_created_at,
        updated_at: critic_updated_at,
      },
    };
  });
}


async function read(reviewId) {
  // TODO: Write your code here
    return db(tableName).select("*").where({ review_id: reviewId }).first();
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
