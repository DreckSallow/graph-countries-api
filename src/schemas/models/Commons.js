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
		allowNull: false,
		unique: DataTypes.STRING,
	},
};

const Lenguaje = {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: DataTypes.STRING,
	},
};

const CommonModels = {
	region: Region,
	border: Border,
	lenguaje: Lenguaje,
};

module.exports = CommonModels;
