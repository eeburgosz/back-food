const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Types",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: false, schema: "food_schema" }
	);
};
