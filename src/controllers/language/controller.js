const { Language } = require("../../schemas/db");

class LanguagesController {
	static getAllLanguages = async ({ where } = {}) => {
		const whereProp = where ?? {};
		const language = await Language.findAll({ where: whereProp });
		return { error: false, content: language };
	};
	static createLanguage = async (props) => {
		const newLanguage = await Language.create(props);
		return { error: false, content: newLanguage };
	};
	static async findOrCreateLanguage(props, { where } = {}) {
		const [language, isCreated] = await Language.findOrCreate({
			where: where ?? {},
			defaults: {
				...props,
			},
		});
		return { error: false, content: { language, isCreated } };
	}
	static getLanguage = async ({ where } = {}) => {
		const whereProp = where ?? {};
		const language = await Language.findOne({ where: whereProp });
		return { error: false, content: language };
	};
}

module.exports = {
	LanguagesController,
};
