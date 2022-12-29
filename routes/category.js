const pool = require("../db/database");

// getCategory is a function that handles requests to the /category endpoint.
// It retrieves the category with the specified id from the categories table in the database.
// It returns the category as a JSON response if it is found, or a 404 error if it is not found.
// If there is an error executing the query, it returns a 500 error with the error message.
const getCategory = (request, response) => {
  // Check if the id parameter is present in the request
  if (!request.query.id) {
    // If the id parameter is not present, return a 400 error
    return response
      .status(400)
      .json({ message: "Missing required parameter: id" });
  }
  // If the id parameter is present, retrieve it from the request query string
  const id = request.query.id;

  // Query the categories table for the category with the specified id
  pool
    .query("SELECT * FROM categories WHERE id = $1", [id])
    .then((result) => {
      // If the category is found, return it as a JSON response
      if (result.rows.length > 0) {
        return response.status(200).json(result.rows[0]);
      }
      // If the category is not found, return a 404 error
      return response.status(404).json({ message: "Category not found" });
    })
    .catch((error) => {
      // If the query fails, return a 500 error with the error message
      return response.status(500).send(error);
    });
};

module.exports = {
  getCategory,
};
