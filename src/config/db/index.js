require("dotenv").config();

const { DB_NAME, DB_USERNAME, DB_HOST, DB_PORT, DB_PASSWORD } = process.env;

const DB = {
	NAME: DB_NAME || "countries-app",
	USERNAME: DB_USERNAME || "postgres",
	HOST: DB_HOST || "localhost",
	PORT: DB_PORT || "5432",
	PASSWORD: DB_PASSWORD || "postgres",
};

module.exports = DB;
