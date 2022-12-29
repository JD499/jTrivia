const pool = require("../db/database");

// getClues is a function that handles requests to the /clues endpoint.
// It filters the results from the clues table based on the value, category, min_date, and max_date parameters.
// It also paginates the results using the offset parameter.
// It returns a JSON object with the resulting rows.
// If there is an error executing the query, it returns a 500 error with the error message.
const getClues = (request, response) => {
  // Get the value, category, min_date, max_date, and offset parameters from the request query string
  const value = request.query.value;
  const category = request.query.category;
  const min_date = request.query.min_date;
  const max_date = request.query.max_date;
  const offset = request.query.offset;

  // Initialize variables for building the SELECT statement
  let query = "SELECT * FROM clues";
  let params = [];
  let conditions = [];

  // If the value parameter is present, add a WHERE clause to filter the results by value
  if (value) {
    conditions.push("value = $1");
    params.push(value);
  }

  // If the category parameter is present, add a WHERE clause to filter the results by category_id
  if (category) {
    conditions.push("category_id = $" + (params.length + 1));
    params.push(category);
  }

  // If the min_date parameter is present, add a WHERE clause to filter the results by minimum date
  if (min_date) {
    conditions.push("airdate >= $" + (params.length + 1));
    params.push(new Date(Date.parse(min_date)));
  }

  // If the max_date parameter is present, add a WHERE clause to filter the results by maximum date
  if (max_date) {
    conditions.push("airdate <= $" + (params.length + 1));
    params.push(new Date(Date.parse(max_date)));
  }

  // If there are any WHERE clauses, add them to the SELECT statement
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  // If the offset parameter is present, add an OFFSET clause to the SELECT statement
  if (offset) {
    query += ` OFFSET ${offset}`;
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
  getClues,
};
