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

const Language = {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: DataTypes.STRING,
	},
};

const CommonModels = {
	region: Region,
	border: Border,
	language: Language,
};

module.exports = CommonModels;
