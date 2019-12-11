/* Mocks and Stubs */
const testConfig = Symbol('config');
const testHandler = Symbol('handler');
const testTopicName = 'testTopic';
const routes = {
	[testTopicName]: testHandler,
};
const mockSubscribe = jest.fn();
const mockgeneratedSubscriber = jest.fn();
const mockKafkaClient = {
	generatedSubscriber: mockgeneratedSubscriber,
};

jest.mock('./kafkaClient', () => mockKafkaClient);

/* Tested */
const kafkaRouter = require('.').default;

describe('kafkaRouter', () => {
	test('kafkaRouter returns a router with the given config.', () => {
		mockgeneratedSubscriber.mockReturnValue(mockSubscribe);
		const router = kafkaRouter(testConfig);

		router(routes);
		expect(mockKafkaClient.generatedSubscriber).toBeCalledWith(testConfig);
		expect(mockSubscribe).toBeCalledWith({
			topic: testTopicName,
			handler: testHandler,
		});
	});
});
