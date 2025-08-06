const db = require("../db/queries");

async function getItemsByCategoryId(req, res) {
  // get slug
  const slug = req.params.slug;
  console.log(req.params.slug);
  const id = await db.getCategoryId(req.params.slug);
  console.log(id);
  // const categories = await db.getItemsByCategoryId(id);
  // res.render("index", { categories });
  res.send(id);
}

module.exports = { getItemsByCategoryId };
