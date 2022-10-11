const countryQueries = `
  countries(languages:[String],regions:[String],sort:SortCountry): [Country]!
  getCountryByName(name:String!): Country
`;

module.exports = {
	countryQueries,
};
