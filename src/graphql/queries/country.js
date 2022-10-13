const countryQueries = `
  countries(languages:[String],regions:[String],sort:SortCountry): [Country]!
  getCountryByName(name:String!): Country
  getCountriesMatchName(name:String): [Country]

`;

module.exports = {
	countryQueries,
};
