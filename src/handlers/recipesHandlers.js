const {
	getAllRecipesController,
	getRecipeByNameController,
	getRecipeByIdController,
	postRecipeController,
} = require("../controllers/recipesControllers");

const getRecipesHandler = async (req, res) => {
	const { name } = req.query;
	try {
		const result = name
			? await getRecipeByNameController(name)
			: await getAllRecipesController();
		result.length === 0
			? res.status(404).json({ message: "Recipes not found" })
			: res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getRecipeByIdHandler = async (req, res) => {
	const { id } = req.params;
	if (isNaN(Number(id)))
		return res.status(404).json({ message: "ID type invalid" });
	try {
		const result = await getRecipeByIdController(id);
		result
			? res.status(200).json(result)
			: res.status(404).json({ message: "ID not found" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const postRecipeHandler = async (req, res) => {
	const {
		name,
		img,
		summary,
		score,
		healthScore,
		stepByStep,
		dishTypes,
		types,
	} = req.body;
	try {
		const result = await postRecipeController(
			name,
			img,
			summary,
			score,
			healthScore,
			stepByStep,
			dishTypes,
			types
		);
		res.status(201).json(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = {
	getRecipesHandler,
	getRecipeByIdHandler,
	postRecipeHandler,
};
