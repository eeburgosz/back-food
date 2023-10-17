const validatePost = (req, res, next) => {
   const { name, summary, stepByStep } = req.body;
   if (!name || !summary || !stepByStep) {
      return res.status(400).json({ message: "Missing data" });
   }
   next();
};

module.exports = {
   validatePost
};