const { getAllTypes } = require("../controllers/typesControllers");

const getTypesHandler = async (req, res) => {
   try {
      const result = await getAllTypes();
      res.status(200).send(result);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

module.exports = {
   getTypesHandler
};