const { UserInputError } = require("apollo-server");
const { BorderController } = require("../../controllers/border/controller");
const { BorderMiddleware } = require("../../controllers/border/middleware");

class BorderResolver {
	static async getAllBorders() {
		const { error, content } = await BorderController.getAllBorders();
		if (error) return [];
		return content;
	}
	static async createBorder(root, args) {
		const onlyParams = {
			initials: args?.name,
		};
		const { errors, existError } = BorderMiddleware.createBorder(onlyParams);
		if (existError) {
			throw new UserInputError(Object.values(errors)[0]);
		}

		const { content } = await BorderController.createBorder(onlyParams);
		return content;
	}
}

module.exports = {
	BorderResolver,
};
