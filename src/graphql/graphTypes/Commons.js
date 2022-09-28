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
const LenguajeType = `
	type Lenguaje {
		id: ID!
		name: String
	}
`;

module.exports = {
	RegionType,
	BorderType,
	LenguajeType,
};
