const { UserInputError } = require("apollo-server");
const { LanguagesController } = require("../../controllers/language/controller");
const { LanguageMiddleware } = require("../../controllers/language/middleware");

class LanguageResolver {
	static async getAllLanguages() {
		const { error, content } = await LanguagesController.getAllLanguages();
		if (error) return [];
		return content;
	}
	static async createLanguage(root, args) {
		const onlyParams = {
			name: args?.name,
		};
		const { errors, existError } = LanguageMiddleware.createLanguage(onlyParams);
		if (existError) {
			throw new UserInputError(Object.values(errors)[0]);
		}
		const { content } = await LanguagesController.createLanguage(onlyParams);
		return content;
	}
}

module.exports = {
	LanguageResolver,
};
