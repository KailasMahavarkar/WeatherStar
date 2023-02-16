module.exports = {
	"*.{ts,tsx}": [
		"eslint . --cache --fix --ext .tsx --ext .ts",
		() => "yarn tsc",
		// () => 'yarn jest',
	],
};
