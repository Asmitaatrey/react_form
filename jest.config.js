module.exports = {
	roots: ["<rootDir>"],
	transform: {
		"\\.(ts|tsx)?$": "babel-jest",
	},
	testMatch: [
		"<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}",
	],
	moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
	testPathIgnorePatterns: ["/node_modules/", "/public/"],
	setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
	testEnvironment: "jsdom",
	moduleNameMapper: {},
}
