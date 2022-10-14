const CountryType = `
	input SortCountry{
		alpha: Boolean
		population: Boolean
		area: Boolean
	}

	type Country {
		id: ID!
		name: String!
		independent: Boolean!
		capital: String
		area: Float
		icon_flag: String
		population: Int
		image: String
		fifa: String
		borders: [Border]
		languages: [Language]
		region: Region
	}
`;

module.exports = {
	CountryType,
};
