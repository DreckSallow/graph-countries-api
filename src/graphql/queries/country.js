const countryQueries = `
  countries(languages:[String],regions:[String],sort:SortCountry): [Country]!
  getCountryByName(name:String!): Country
  getCountryById(id:Int!): Country
  getCountriesMatchName(name:String): [Country]

`;

module.exports = {
	countryQueries,
};
