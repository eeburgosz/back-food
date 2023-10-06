const { Router } = require("express");
const recipesRouter = require("./recipesRouter");
const typesRouter = require("./typesRouter");
const postRecipeRouter = require("./postRecipeRouter");

const mainRouter = Router();

mainRouter.use('/recipes', recipesRouter);
mainRouter.use('/types', typesRouter);
mainRouter.use('/recipe', postRecipeRouter);

module.exports = mainRouter;