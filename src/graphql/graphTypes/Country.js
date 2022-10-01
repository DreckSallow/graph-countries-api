const CountryType = `
	type Country {
		id: ID!
		name: String!
		independent: Boolean!
		capital: String
		area: Int
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
