describe('kafkaClient', () => {
	test('kafkaClient is just a container for some key methods.', () => {
		const mockgeneratedSubscriber = Symbol('generatedSubscriber');

		jest.mock('./generatedSubscriber', () => mockgeneratedSubscriber);

		const kafkaClient = require('.').default;

		expect(kafkaClient).toEqual({
			generatedSubscriber: mockgeneratedSubscriber,
		});
	});
});
