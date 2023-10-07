const { Op } = require("sequelize");
const { Recipes, Types } = require("../db");
const { infoApiRecipes } = require("../utils/api");


const createRecipesAndAssociateTypes = async () => {
   const data = await Recipes.findAll();
   if (data.length === 0) {
      const recipesData = await infoApiRecipes();
      try {
         //! Paso 1: Crea las instancias de recetas
         const recipesInstances = await Recipes.bulkCreate(recipesData);
         //! Paso 2: Verifica y obtén o crea las instancias de dietas
         const dietsMap = new Map();
         for (const recipe of recipesData) {
            const diets = recipe.diets;
            for (const dietName of diets) {
               if (!dietsMap.has(dietName)) {
                  const dietInstance = await Types.findOrCreate({
                     where: { name: dietName }
                  });
                  dietsMap.set(dietName, dietInstance[0]);
               }
            }
         }
         //! Paso 3: Asocia las recetas con las dietas
         for (const recipeInstance of recipesInstances) {
            const diets = recipesData.find(recipe => recipe.id === recipeInstance.id).diets;
            await recipeInstance.setTypes(diets.map(dietName => dietsMap.get(dietName).id));
         }
         console.log('Recetas y tipos de dieta creados y asociados correctamente.');
         return await Recipes.findAll();
      } catch (error) {
         console.error('Error al crear y asociar recetas y tipos de dieta:', error);
      }
   }
};

createRecipesAndAssociateTypes();

const getAllRecipesController = async () => await Recipes.findAll({
   include: [
      {
         model: Types,
         attributes: {
            exclude: ['RecipesTypes']
         }
      }
   ]
});

const getRecipeByNameController = async (name) => await Recipes.findAll({
   where: {
      name: {
         [Op.iLike]: `%${name}%`
      }
   }, include: [
      {
         model: Types,
         attributes: {
            exclude: ['RecipesTypes']
         }
      }
   ]
});
;

const getRecipeByIdController = async (id) => await Recipes.findByPk(id, {
   include: [{
      model: Types
   }]
});

const postRecipeController = async (name, img, summary, score, healthScore, stepByStep, dishTypes, types) => {
   const exist = await Recipes.findAll({
      where: {
         name
      }
   });
   if (exist) throw new Error("Recipe already exists");
   const newRecipe = await Recipes.create({
      name, img, summary, score, healthScore, stepByStep, dishTypes
   });
   const foundTypes = await Types.findAll({
      where: {
         name: types,
      },
   });

   await newRecipe.setTypes(foundTypes);
};

module.exports = {
   getAllRecipesController,
   getRecipeByNameController,
   getRecipeByIdController,
   postRecipeController
};