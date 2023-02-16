module.exports = {
	env: {
		es6: true,
		node: true,
		jest: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.json",
		// ecmaFeatures: {
		//   jsx: true,
		// },
		// ecmaVersion: "latest",
		// sourceType: "module",
	},
	plugins: ["react", "react-hooks", "@typescript-eslint"],
	rules: {
		"no-empty-function": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-unsafe-member-access": "off",
		"@typescript-eslint/no-unsafe-call": "off",
		"@typescript-eslint/no-unsafe-argument": "off",
		"@typescript-eslint/no-floating-promises": "off",
		"react/display-name": "off",
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
