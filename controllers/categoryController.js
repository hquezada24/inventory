const db = require("../db/queries");

async function getItemsByCategoryId(req, res) {
  // get slug
  const slug = req.params.slug;

  const id = await db.getCategoryId(slug);
  console.log(id.id);
  const items = await db.getItemsByCategoryId(id.id);
  res.render("index", { items });
}

module.exports = { getItemsByCategoryId };
