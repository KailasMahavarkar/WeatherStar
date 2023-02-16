/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/** @type {import('tailwindcss').Config} */
const daisy = require("daisyui");
const plugin = require("tailwindcss/plugin");

module.exports = {
	content: [
		"./App.tsx",
		"./views/**/*.{js,ts,jsx,tsx,md,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,md,mdx}",
	],
	darkMode: ["class", '[data-theme="dark"]'],
	theme: {
		extend: {
			fontFamily: {
				satoshi: "Satoshi sans-serif",
			},
		},
	},
	daisyui: {
		styled: true,
		themes: [
			{
				light: {
					...require("daisyui/src/colors/themes")[
						"[data-theme=light]"
					],

					fontFamily: "Roboto",
				},
			},
		],
		base: true,
		utils: true,
		logs: true,
		rtl: false,

		prefix: "",
	},
	plugins: [
		daisy,
		plugin(function ({ addBase, addComponents, addUtilities, theme }) {
			addBase({});
			addComponents({});
			addUtilities({
				test: {
					color: "red",
				},
			});
		}),
	],
};
