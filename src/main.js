const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./graphql");
// const { BorderResolver } = require("./graphql/resolvers/Border");
const { CountryResolver } = require("./graphql/resolvers/country");
// const { LenguajeResolver } = require("./graphql/resolvers/Lenguaje");
const { connection } = require("./schemas/db");

const server = new ApolloServer({
	typeDefs,
	csrfPrevention: true,
	resolvers: {
		Query: {
			countries: CountryResolver.getAllCountries,
			// getLenguajes: LenguajeResolver.getAllLenguajes,
		},
		Mutation: {
			// addBorder: BorderResolver.createBorder,
			// addLenguaje: LenguajeResolver.createLenguaje,
		},
	},
});

connection(() => {
	console.log("Connection is succsefully with database ✨");
	server.listen().then(({ url }) => {
		console.log("🚀 server is running at ", url);
	});
});
