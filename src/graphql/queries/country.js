const countryQueries = `
  countries: [Country]!
  getCountryByName(name:String!): Country
`;

module.exports = {
	countryQueries,
};
