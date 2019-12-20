import parseJSON from './parseJSON';

describe('parseJSON', () => {
	test('Returns the parsed value of the given JSON string.', () => {
		const jsonString = '{}';
		const parsed = parseJSON(jsonString);

		expect(parsed).toEqual({});
	});

	test('Returns the defaultValue when the given string is'
	+ ' not a valid JSON.', () => {
		const jsonString = '';
		const defaultValue = Symbol('defaultValue');
		const parsed = parseJSON(jsonString, defaultValue);

		expect(parsed).toEqual(defaultValue);
	});

	test('Returns an empty object when the given string is '
	+ ' not a valid JSON and when no defaultValue is provided.', () => {
		const jsonString = '';
		const parsed = parseJSON(jsonString);

		expect(parsed).toEqual({});
	});
});
