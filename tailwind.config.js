/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			'black-text': '#141615',
			'white-title': '#F0F0F0',
			black: '#141615',
			white: '#ffffff',
			grey: '#ebedee',
			green: 'green',
			red: 'red'
		},
		fontFamily: {
			montserrat: ['Montserrat', 'sans-serif']
		},
		screens: {
			xs: '480px',
			sm: '768px',
			md: '992px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px'
		},
		gridTemplateColumns: {
			footer: '1fr 1fr 1fr 3fr',
			'footer-md': '1fr 1fr',
			'footer-xs': '1fr',
			half: '1fr 1fr',
			third: '1fr 1fr 1fr'
		},
		extend: {}
	},
	plugins: []
};
