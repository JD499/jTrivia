const pool = require("../db/database");

// getFinal is a function that handles requests to the /final endpoint.
// It retrieves a random final jeopardy question from the clues table in the database.
// It returns the clue as a JSON response.
// If there is an error executing the query, it returns a 500 error with the error message.
const getFinal = (request, response) => {
  // Get the count parameter from the request query string
  const count = request.query.count;

  // Initialize variables for building the SELECT statement
  let query = "SELECT * FROM final_clues ORDER BY RANDOM() LIMIT 1";
  let params = [];

  // If the count parameter is present, add a LIMIT clause to the SELECT statement
  if (count) {
    query = "SELECT * FROM final_clues ORDER BY RANDOM() LIMIT $1";
    params.push(count);
  }

  // Execute the SELECT statement and handle the resulting promise
  // If the query is successful, return a JSON response with the resulting rows
  // If the query fails, return a 500 error with the error message
  pool
    .query(query, params)
    .then((result) => response.status(200).json(result.rows))
    .catch((error) => response.status(500).send(error));
};

module.exports = {
  getFinal,
};
