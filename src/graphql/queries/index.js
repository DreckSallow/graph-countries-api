const { countryQueries } = require("./country");
const { languajeQueries } = require("./languaje");
const { regionQueries } = require("./region");

const Query = `
  type Query{
		${countryQueries}
		${languajeQueries}
		${regionQueries}
	}
`;

module.exports = {
	Query,
};
