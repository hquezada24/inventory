const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function insertCategoy(name) {
  await pool.query("INSERT INTO items (name) VALUES ($1)", [name]);
}

module.exports = {
  getAllCategories,
  insertCategoy,
};
