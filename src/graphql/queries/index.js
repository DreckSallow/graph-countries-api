const { countryQueries } = require("./country");
const { languajeQueries } = require("./languaje");

const Query = `
  type Query{
		${countryQueries}
		${languajeQueries}
	}
`;

module.exports = {
	Query,
};
