module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-dark": "#FF6363",
				"primary-medium": "#FFAEAE",
				"primary-light": "#FFE0E0",

				"secondary-dark": "#FFAB76",
				"secondary-medium": "#FFD7BE",
				"secondary-light": "#FFE8D9",

				"warning-dark": "#FFFC73",
				"warning-medium": "#FFFDA2",
				"warning-light": "#FFFECE",

				"success-dark": "#86D97E",
				"success-medium": "#BFFFBA",
				"success-light": "#E5FFE2",
			},
			Image: {
				"card-banner":
					"https://images.pexels.com/photos/9454915/pexels-photo-9454915.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			},
		},
	},
	plugins: [],
}
