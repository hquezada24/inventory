const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function insertCategoy(name) {
  await pool.query("INSERT INTO items (name) VALUES ($1)", [name]);
}

async function getItemsByCategoryId(id) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id = $1",
    [id]
  );
  return rows;
}

async function getCategoryId(slug) {
  const { rows } = await pool.query(
    "SELECT id FROM categories WHERE slug = $1",
    [slug]
  );
  console.log(slug);
  return rows[0];
}

module.exports = {
  getAllCategories,
  insertCategoy,
  getItemsByCategoryId,
  getCategoryId,
};
