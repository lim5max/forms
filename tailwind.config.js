const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"Inter",
					...fontFamily.sans,
					"system-ui",
					"Helvetica Neue",
					"Arial",
					"sans-serif",
				],
				montserrat: ["Montserrat", "sans-serif"],
			},
		},
	},
	plugins: [require("tailwindcss-radix")(), require("tailwindcss-animate")],
};
