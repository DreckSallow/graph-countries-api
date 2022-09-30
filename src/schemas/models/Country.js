const { DataTypes } = require("sequelize");

const Country = {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	independent: DataTypes.BOOLEAN,
	capital: DataTypes.STRING,
	area: DataTypes.REAL,
	icon_flag: DataTypes.STRING,
	population: DataTypes.REAL,
	image: DataTypes.STRING,
	fifa: DataTypes.STRING,
};

module.exports = {
	country: Country,
};
