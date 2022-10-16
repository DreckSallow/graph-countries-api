const { Border } = require("../../schemas/db");

class BorderController {
	static async createBorder(props) {
		const newBorder = await Border.create(props);
		return { error: false, content: newBorder };
	}
	static async getBordersByCountry(country) {
		const bordersByCountry = await country.getBorders();
		return { error: false, content: bordersByCountry };
	}
	static async findBorderById(id) {
		const getBorder = await Border.findByPk(id);
		if (getBorder) return { error: false, content: getBorder };
		return { error: true, content: `The Border with ${id} not exist` };
	}
	static async findOrCreateBorder(props, { where } = {}) {
		const [border, isCreated] = await Border.findOrCreate({
			where: where ?? {},
			defaults: {
				...props,
			},
		});
		return { error: false, content: { border, isCreated } };
	}
	static async getAllBorders({ where } = {}) {
		const allBorders = await Border.findAll({ where: where ?? {} });
		return { error: false, content: allBorders };
	}
}

module.exports = {
	BorderController,
};
