const { Router } = require("express");
const { getRecipesHandler, getRecipeByIdHandler } = require("../handlers/recipesHandlers");

const recipesRouter = Router();

recipesRouter.get("/", getRecipesHandler);
recipesRouter.get("/:id", getRecipeByIdHandler);

module.exports = recipesRouter;