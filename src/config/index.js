require("dotenv").config();
const DB = require("./db/index");

const ENV_VARS = {
	DB: { ...DB },
	IS_PRODUCTION: process.env.PRODUCTION ? JSON.parse(process.env.PRODUCTION) : false,
};

module.exports = {
	ENV_VARS,
};
