const { Region } = require("../../schemas/db");

class RegionController {
	static async createRegion(props) {
		const newRegion = await Region.create(props);
		return { error: false, content: newRegion };
	}
	static async getRegionsByCountry(country) {
		const regions = await country.getRegions();
		return { error: false, content: regions };
	}
	static async findRegionById(id) {
		const region = await Region.findByPk(id);
		if (region) return { error: false, content: region };
		return { error: true, content: `The Border with ${id} not exist` };
	}
	static async findOrCreateRegion(props, { where } = {}) {
		const [region, isCreated] = await Region.findOrCreate({
			where: where ?? {},
			defaults: {
				...props,
			},
		});
		return { error: false, content: { region, isCreated } };
	}
	static async getAllRegions({ where } = {}) {
		const allRegions = await Region.findAll({ where: where ?? {} });
		return { error: false, content: allRegions };
	}
}

module.exports = {
	RegionController,
};
