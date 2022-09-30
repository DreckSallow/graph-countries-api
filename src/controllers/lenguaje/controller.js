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
