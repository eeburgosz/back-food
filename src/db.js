const { Sequelize } = require("sequelize");
const RecipesModel = require("./models/Recipes");
const TypesModel = require("./models/Types");

require("dotenv").config();
const { DB_PASSWORD, DB_USER, DB_HOST, DATABASE_URL } = process.env;

// const sequelize = process.env.NODE_ENV === 'production'
//    ?
//    new Sequelize(`postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_URL}/food`, {
//       logging: false,
//       dialect: "postgres",
//       native: false,
//       ssl: true,
//       dialectOptions: {
//          ssl: {
//             require: true,
//             rejectUnauthorized: false
//          },
//          keepAlive: true
//       }
//    })
//    :
//    new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, { logging: false });

const sequelize =
	process.env.NODE_ENV === "production"
		? new Sequelize(DATABASE_URL, {
				logging: false,
				dialect: "postgres",
				native: false,
				ssl: true,
				dialectOptions: {
					ssl: {
						require: true,
						rejectUnauthorized: false,
					},
					keepAlive: true,
				},
				schema: "food_schema",
		  })
		: new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
				logging: false,
				schema: "food_schema",
		  });

RecipesModel(sequelize);
TypesModel(sequelize);

const { Recipes, Types } = sequelize.models;

const RecipesTypes = sequelize.define(
	"RecipesTypes",
	{},
	{ timestamps: false, schema: "food_schema" }
);
Recipes.belongsToMany(Types, { through: RecipesTypes });
Types.belongsToMany(Recipes, { through: RecipesTypes });

module.exports = {
	sequelize,
	...sequelize.models,
};
