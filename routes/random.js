const pool = require("../db/database");

// getRandom is a function that handles requests to the /random endpoint.
// It retrieves a certain number of random clues from the clues table in the database.
// It returns the clues as a JSON response.
// If there is an error executing the query, it returns a 500 error with the error message.
const getRandom = (request, response) => {
  // Get the count parameter from the request query string
  const count = request.query.count;

  // Initialize variables for building the SELECT statement
  let query = "SELECT * FROM clues ORDER BY RANDOM() LIMIT 1";
  let params = [];

  // If the count parameter is present, add a LIMIT clause to the SELECT statement
  if (count) {
    query = "SELECT * FROM clues ORDER BY RANDOM() LIMIT $1";
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
  getRandom,
};
