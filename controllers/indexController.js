const db = require("../db/queries");
const { get } = require("../routes/indexRouter");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("index", { categories });
}

module.exports = { getAllCategories };
