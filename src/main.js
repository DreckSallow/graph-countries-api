const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./graphql");
const { CountryResolver } = require("./graphql/resolvers/country");
const { connection } = require("./schemas/db");

const server = new ApolloServer({
	typeDefs,
	csrfPrevention: true,
	resolvers: {
		Query: {
			countries: CountryResolver.getAllCountries,
		},
	},
});

connection(() => {
	console.log("Connection is succsefully with database ✨");
	server.listen().then(({ url }) => {
		console.log("🚀 server is running at ", url);
	});
});
