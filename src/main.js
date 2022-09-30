const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./graphql");
// const { BorderResolver } = require("./graphql/resolvers/Border");
const { CountryResolver } = require("./graphql/resolvers/country");
// const { LanguageResolver } = require("./graphql/resolvers/Lenguaje");
const { connection } = require("./schemas/db");

const server = new ApolloServer({
	typeDefs,
	csrfPrevention: true,
	resolvers: {
		Query: {
			countries: CountryResolver.getAllCountries,
			// getLanguages: LanguageResolver.getAllLanguages,
		},
		Mutation: {
			// addBorder: BorderResolver.createBorder,
			// addLanguage: LanguageResolver.createLanguage,
		},
	},
});

connection(() => {
	console.log("Connection is succsefully with database ✨");
	server.listen().then(({ url }) => {
		console.log("🚀 server is running at ", url);
	});
});
