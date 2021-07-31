/** @type {import('tailwindcss/tailwind-config').TailwindConfig */
const config = {
	mode: 'jit',
	darkMode: 'class',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],

	daisyui: {
		styled: true,
		themes: ['light', 'dark'],
		base: true,
		utils: true,
		logs: true,
		rtl: false,
	},
}

module.exports = config
