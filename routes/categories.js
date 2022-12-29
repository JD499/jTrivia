const pool = require("../db/database");

// getCategories is a function that handles requests to the /categories endpoint.
// It retrieves the categories from the categories table in the database, limited by the count and offset parameters.
// It returns the categories as a JSON response.
// If there is an error executing the query, it returns a 500 error with the error message.
const getCategories = (request, response) => {
  // Get the count and offset parameters from the request query string
  const count = request.query.count;
  const offset = request.query.offset;

  // Initialize variables for building the SELECT statement
  let query = "SELECT * FROM categories";
  let params = [];

  // If the count parameter is present, add a LIMIT clause to the SELECT statement
  if (count) {
    query += " LIMIT $1";
    params.push(count);
  }
  // If the offset parameter is present, add an OFFSET clause to the SELECT statement
  if (offset) {
    query += " OFFSET $2";
    params.push(offset);
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
  getCategories,
};
