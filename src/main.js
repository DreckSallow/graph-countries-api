const { connection } = require("./schemas/db");

connection(() => {
	console.log("Database is already in use : ");
});
