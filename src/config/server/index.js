require("dotenv").config();

const { PORT } = process.env;

const SERVER = {
	PORT: PORT || 3000,
};

module.exports = {
	SERVER,
};
