module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: ["eslint:recommended", "eslint-config-prettier"],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		indent: [2, "tab"],
		"linebreak-style": 0,
		// quotes: ["error", "single"],
		semi: ["error", "always"],
	},
};
