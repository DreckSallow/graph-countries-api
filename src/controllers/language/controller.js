const { Language } = require("../../schemas/db");

class LanguagesController {
	static getAllLanguages = async ({ where } = {}) => {
		try {
			const whereProp = where ?? {};
			const language = await Language.findAll({ where: whereProp });
			return { error: false, content: language };
		} catch (err) {
			return { error: true, content: err };
		}
	};
	static createLanguage = async (props) => {
		try {
			const newLanguage = await Language.create(props);
			return { error: false, content: newLanguage };
		} catch (err) {
			return { error: true, content: err };
		}
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
		try {
			const whereProp = where ?? {};
			const language = await Language.findOne({ where: whereProp });
			return { error: false, content: language };
		} catch (err) {
			return { error: true, err, content: err };
		}
	};
}

module.exports = {
	LanguagesController,
};
