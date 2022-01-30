/** @type {import('tailwindcss/tailwind-config').TailwindConfig */
const config = {
	mode: 'jit',
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts,md}'],
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
