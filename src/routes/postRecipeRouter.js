const { Router } = require("express");
const { postRecipeHandler } = require("../handlers/recipesHandlers");
const { validatePost } = require("../middlewares/validate");

const postRecipeRouter = Router();

postRecipeRouter.post('/', validatePost, postRecipeHandler);

module.exports = postRecipeRouter;