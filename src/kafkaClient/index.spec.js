describe('kafkaClient', () => {
	test('kafkaClient is just a container for some key methods.', () => {
		const mockGetSubscriber = Symbol('getSubscriber');

		jest.mock('./getSubscriber', () => mockGetSubscriber);

		const kafkaClient = require('.').default;

		expect(kafkaClient).toEqual({
			getSubscriber: mockGetSubscriber,
		});
	});
});
