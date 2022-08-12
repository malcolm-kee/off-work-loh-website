const { sky } = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: sky,
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
