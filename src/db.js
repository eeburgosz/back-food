const { Sequelize } = require('sequelize');
const RecipesModel = require('./models/Recipes');
const TypesModel = require('./models/Types');

require('dotenv').config();
const { DB_PASSWORD, DB_USER, DB_HOST, DATABASE_URL } = process.env;

const sequelize = process.env.NODE_ENV === 'production'
   ?
   new Sequelize(DATABASE_URL,
      {
         logging: false,
         port: 5432,
         dialect: "postgres",
         native: false,
         ssl: true,
         dialectOptions: {
            ssl: {
               require: true,
               rejectUnauthorized: false
            },
            keepAlive: true
         }
      })
   :
   new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, { logging: false });

RecipesModel(sequelize);
TypesModel(sequelize);

const { Recipes, Types } = sequelize.models;

const RecipesTypes = sequelize.define('RecipesTypes', {}, { timestamps: false });
Recipes.belongsToMany(Types, { through: RecipesTypes });
Types.belongsToMany(Recipes, { through: RecipesTypes });

module.exports = {
   sequelize,
   ...sequelize.models
};