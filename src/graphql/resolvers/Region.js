const { UserInputError } = require("apollo-server");
const { RegionController } = require("../../controllers/region/controller");
const { RegionMiddleware } = require("../../controllers/region/middleware");

class RegionResolver {
	static async getAllRegions() {
		const { error, content } = await RegionController.getAllRegions();
		if (error) return [];
		return content;
	}
	static async createRegion(root, args) {
		const onlyParams = {
			name: args?.name,
		};
		const { errors, existError } = RegionMiddleware.createRegion(onlyParams);
		if (existError) {
			throw new UserInputError(Object.values(errors)[0]);
		}
		const { content } = await RegionController.createRegion(onlyParams);
		return content;
	}
}

module.exports = {
	RegionResolver,
};
