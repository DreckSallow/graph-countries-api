const { gql } = require("apollo-server");

const country = require("./graphTypes/Country");
const comun = require("./graphTypes/Commons");
const { Query } = require("./queries");

const typeDefs = {
	...country,
	...comun,
	...Query,
};

const globalTypeDefs = Object.values(typeDefs).reduce((str, model) => {
	return `${str}${model}`;
}, "");

module.exports = {
	typeDefs: gql(globalTypeDefs),
};
