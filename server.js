const express = require("express");
const app = express();

const { getCategory } = require("./routes/category");
const { getCategories } = require("./routes/categories");
const { getFinal } = require("./routes/final");
const { getRandom } = require("./routes/random");
const { getClues } = require("./routes/clues");

app.use(express.static("public"));
app.use("/api/category", getCategory);
app.use("/api/categories", getCategories);
app.use("/api/clues", getClues);
app.use("/api/final", getFinal);
app.use("/api/random", getRandom);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
