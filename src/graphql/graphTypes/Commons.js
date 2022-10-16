const RegionType = `
	type Region {
		id: ID!
    name: String
	}
`;

const BorderType = `
	type Border {
		id: ID!
		initials: String
	}
`;
const LanguageType = `
	type Language {
		id: ID!
		name: String
	}
`;

module.exports = {
	RegionType,
	BorderType,
	LanguageType,
};
