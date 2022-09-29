const checkParams = (params, length) => {
	const validates = [];
	params.forEach((param) => {
		if (param !== undefined && param !== null) {
			validates.push(param);
		}
	});
	return validates.length === length;
};

const ValidateErros = {
	IN_RANGE: "IN_RANGE",
	IS_EMPTY: "IS_EMPTY",
	IS_LENGTH: "IS_LENGTH",
	IS_NUMBER: "IS_NUMBER",
	IS_BOOLEAN: "IS_BOOLEAN",
	IS_NULL: "IS_NULL",
	IS_TYPE: "IS_TYPE",
};

class Validator {
	value = null;
	isNull = false;
	errors = {};
	constructor(value) {
		if (value === null || value === undefined) {
			this.errors[ValidateErros.IS_NULL] = `The value not exist`;
			this.isNull = true;
		}
		this.value = value;
	}
	is(type) {
		if (this.isNull) return this;
		if (typeof this.value !== type) {
			this.errors[ValidateErros.IS_TYPE] = `The value is not of type ${type}`;
		}
		return this;
	}
	inRange({ min, max } = {}) {
		if (this.isNull) return this;
		const value = this.value;
		if (checkParams([min, max], 2)) {
			if (value < min || value > max) {
				this.errors[
					ValidateErros.IN_RANGE
				] = `The value must be greater than or equals to ${min} and less than or equals to ${max}`;
			}
			return this;
		}
		if (checkParams([min], 1)) {
			if (value < min) {
				this.errors[ValidateErros.IN_RANGE] = `The value must be greater than or equals to ${min}`;
			}
			return this;
		}
		if (checkParams([max], 1)) {
			if (value > max) {
				this.errors[ValidateErros.IN_RANGE] = `The value must be less than or equals to ${max}`;
			}
			return this;
		}
		return this;
	}
	isEmpty() {
		if (this.isNull) return this;
		const value = this.value;
		if (typeof value !== "string") {
			this.errors[ValidateErros.IS_EMPTY] = `The value is not string`;
			return this;
		}
		if (value.length !== 0) {
			this.errors[ValidateErros.IS_EMPTY] = `The value is not empty`;
			return this;
		}
		return this;
	}
	isLength({ min, max } = {}) {
		const value = this.value;
		if (this.isNull) return this;
		if (typeof value !== "string") {
			this.errors[ValidateErros.IS_LENGTH] = `The value is not string`;
			return this;
		}
		const valueLength = value.length;
		if (checkParams([min, max], 2)) {
			if (valueLength < min || valueLength > max) {
				this.errors[
					ValidateErros.IS_LENGTH
				] = `The length of the value must be greater than or equals to ${min} and less than or equals to ${max}`;
			}
			return this;
		}
		if (checkParams([min], 1)) {
			if (valueLength < min) {
				this.errors[ValidateErros.IS_LENGTH] = `The length of the value must be greater than or equals to ${min}`;
			}
			return this;
		}
		if (checkParams([max], 1)) {
			if (valueLength > max) {
				this.errors[ValidateErros.IS_LENGTH] = `The length of the value must be less than or equals to ${max}`;
			}
			return this;
		}
		return this;
	}
	isNumber({ transform = false }) {
		const value = this.value;
		if (this.isNull) return this;
		if (typeof value === "string" && transform) {
			this.value = Number(value);
			return this;
		}
		if (typeof value === "string" && !transform) {
			this.errors[ValidateErros.IS_NUMBER] = `The value is not string`;
			return this;
		}
		return this;
	}
	isBoolean() {
		const value = this.value;
		if (this.isNull) return this;
		if (typeof value !== "boolean") {
			this.errors[ValidateErros.IS_BOOLEAN] = `The value is not boolean`;
			return this;
		}
		return this;
	}
	is_ok() {
		if (this.isNull || Object.values(this.errors).length > 0) return false;
		return true;
	}
	evaluate(callback) {
		callback(this.getErrors());
	}
	getErrors(isArray = true) {
		if (isArray) {
			return Object.entries(this.errors);
		}
		return Object.entries(this.errors).reduce((acc, [key, v]) => ({ ...acc, [key]: v }), {});
	}
}

const validator = (v) => {
	return new Validator(v);
};

const verifyErrors = (validations) => {
	let errors = {};
	Object.entries(validations).forEach(([key, val]) => {
		if (val instanceof Validator) {
			if (val.getErrors().length > 0) {
				errors = {
					...errors,
					[key]: {
						...val.getErrors(false),
					},
				};
			}
		}
	});
	return { existError: Object.keys(errors).length > 0, errors: { ...errors } };
};

module.exports = {
	validator,
	verifyErrors,
};
