const { gql } = require("apollo-server");

const country = require("./graphTypes/Country");
const comun = require("./graphTypes/Commons");

const Query = `
	type Query{
		countries:[Country]!
	}
`;
const modelReduce = {
	...country,
	...comun,
	query: Query,
};

const globalTypeDefs = Object.values(modelReduce).reduce((str, model) => {
	return `${str}${model}`;
}, "");

module.exports = {
	typeDefs: gql(globalTypeDefs),
};
