const { readSeedAndFillDB } = require("./initDB");
const { connection } = require("./schemas/db");

connection(() => {
	console.log("Connection is succsefully with database ✨");
	readSeedAndFillDB()
		.then(() => {
			console.log("The database was filled successfully");
		})
		.catch((err) => {
			console.log("Could not fill database, ", err);
		});
});
