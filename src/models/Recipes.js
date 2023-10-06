const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
   sequelize.define("Recipes", {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      img: {
         type: DataTypes.STRING,
      },
      summary: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      score: {
         type: DataTypes.INTEGER,
         defaultValue: 1
      },
      healthScore: {
         type: DataTypes.INTEGER,
         defaultValue: 1
      },
      stepByStep: {
         type: DataTypes.ARRAY(DataTypes.JSONB)
      },
      dishTypes: {
         type: DataTypes.ARRAY(DataTypes.STRING)
      }
   }, { timestamps: false });
};