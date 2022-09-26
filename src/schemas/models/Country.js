const { DataTypes } = require("sequelize");

const Country = {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	independent: DataTypes.BOOLEAN,
	capital: DataTypes.STRING,
	area: DataTypes.INTEGER,
	icon_flag: DataTypes.STRING,
	population: DataTypes.INTEGER,
	image: DataTypes.STRING,
	fifa: DataTypes.STRING,
};

module.exports = {
	country: Country,
};
