const { DataTypes } = require("sequelize");

const Region = {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
};

const Border = {
	initials: {
		type: DataTypes.STRING,
	},
};

const Lenguaje = {
	name: {
		type: DataTypes.STRING,
	},
};

module.exports = {
	Region,
	Border,
	Lenguaje,
};
