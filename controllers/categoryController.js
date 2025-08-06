const db = require("../db/queries");

async function getItemsByCategoryId(req, res) {
  // get slug
  const slug = req.params.slug;

  // get category id and its name
  const { id, name } = await db.getCategory(slug);

  // get the items from that category
  const items = await db.getItemsByCategoryId(id);

  console.log(items);
  // render
  res.render("category", { name, items });
}

module.exports = { getItemsByCategoryId };
