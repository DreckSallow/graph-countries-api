const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./graphql");
// const { BorderResolver } = require("./graphql/resolvers/Border");
const { CountryResolver } = require("./graphql/resolvers/country");
const { LanguageResolver } = require("./graphql/resolvers/Language");
const { connection } = require("./schemas/db");
const { RegionResolver } = require("./graphql/resolvers/Region");
const express = require("express");
const cors = require("cors");
const {
	ENV_VARS: { IS_PRODUCTION, SERVER, ORIGIN },
} = require("./config/index");

const app = express();
app.use(cors({ origin: ORIGIN, methods: ["GET", "POST", "PUT", "DELETE"] }));

const apolloServer = new ApolloServer({
	typeDefs,
	introspection: !IS_PRODUCTION,
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
	persistedQueries: false,
});

connection(async () => {
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });

	app.listen(SERVER.PORT, () => {
		console.log("server listen on port: ", SERVER.PORT);
	});
});
