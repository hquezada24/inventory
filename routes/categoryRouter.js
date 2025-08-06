const { Router } = require("express");
const categoryRouter = Router();
const categoryController = require("../controllers/categoryController");

categoryRouter.get("/:slug", categoryController.getItemsByCategoryId);
// categoryRouter.get("/:slug", (req, res) => {
//   console.log(req.params.slug);
//   res.send(req.params.slug);
// });

module.exports = categoryRouter;
