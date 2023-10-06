const { Types } = require("../db");
const { infoApiTypes } = require("../utils/api");

const getAllTypes = async () => {
   const dbTypes = await Types.findAll();
   if (dbTypes.length === 0) {
      const types = await infoApiTypes();
      const insertedTypes = [];

      for (const typeName of types) {
         const [type] = await Types.findOrCreate({
            where: {
               name: typeName
            }
         });
         insertedTypes.push(type);
      }
      return insertedTypes;
   }
   return await Types.findAll();
};

module.exports = {
   getAllTypes
};