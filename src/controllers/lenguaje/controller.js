const { Lenguaje } = require("../../schemas/db");

class LenguajeController {
	static getAllLenguajes = async ({ where } = {}) => {
		try {
			const whereProp = where ?? {};
			const lenguaje = await Lenguaje.findAll({ where: whereProp });
			return { error: false, content: lenguaje };
		} catch (err) {
			return { error: true, content: err };
		}
	};
	static createLenguaje = async (props) => {
		try {
			const newLenguaje = await Lenguaje.create(props);
			return { error: false, content: newLenguaje };
		} catch (err) {
			return { error: true, content: err };
		}
	};
	static async findOrCreateLenguaje(props, { where } = {}) {
		const [lenguaje, isCreated] = await Lenguaje.findOrCreate({
			where: where ?? {},
			defaults: {
				...props,
			},
		});
		return { error: false, content: { lenguaje, isCreated } };
	}
	static getLenguaje = async ({ where } = {}) => {
		try {
			const whereProp = where ?? {};
			const lenguaje = await Lenguaje.findOne({ where: whereProp });
			return { error: false, content: lenguaje };
		} catch (err) {
			return { error: true, err, content: err };
		}
	};
}

module.exports = {
	LenguajeController,
};
