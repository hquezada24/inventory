const db = require("../db/queries");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("index", { categories });
}
async function getCategorySlug(req, res) {
  const slug = await db.getSlug();
  return slug;
}

module.exports = { getAllCategories };
