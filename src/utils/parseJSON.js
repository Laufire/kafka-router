export default (stringToParse, defaultValue) => {
	try {
		return JSON.parse(stringToParse);
	}
	catch (dummy) {
		return defaultValue || {};
	}
};
