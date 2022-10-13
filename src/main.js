const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./graphql");
// const { BorderResolver } = require("./graphql/resolvers/Border");
const { CountryResolver } = require("./graphql/resolvers/country");
const { readSeedAndFillDB } = require("./initDB");
const { LanguageResolver } = require("./graphql/resolvers/Language");
const { connection } = require("./schemas/db");
const { RegionResolver } = require("./graphql/resolvers/Region");

const server = new ApolloServer({
	typeDefs,
	csrfPrevention: true,
	resolvers: {
		Query: {
			countries: CountryResolver.getAllCountries,
			getCountryByName: CountryResolver.getOneCountryByName,
			getLanguages: LanguageResolver.getAllLanguages,
			getRegions: RegionResolver.getAllRegions,
			getCountriesMatchName: CountryResolver.getCountriesMatchName,
			getCountryById: CountryResolver.getCountriesById,
		},
		// Mutation: {
		// 	// addBorder: BorderResolver.createBorder,
		// 	// addLanguage: LanguageResolver.createLanguage,
		// },
	},
});

connection(() => {
	console.log("Connection is succsefully with database ✨");
	readSeedAndFillDB()
		.then(() => {
			console.log("The database was filled successfully");
			server
				.listen()
				.then(({ url }) => {
					console.log("🚀 server is running at ", url);
				})
				.catch((err) => {
					console.log("something went wrong when running the server: ", err);
				});
		})
		.catch((err) => {
			console.log("Could not fill database, ", err);
		});
});
