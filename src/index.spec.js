/* Mocks and Stubs */
const testConfig = Symbol('config');
const testHandler = Symbol('handler');
const testTopicName = 'testTopic';
const routes = {
	[testTopicName]: testHandler,
};
const mockSubscribe = jest.fn();
const mockGetSubscriber = jest.fn();
const mockKafkaClient = {
	getSubscriber: mockGetSubscriber,
};

jest.mock('./kafkaClient', () => mockKafkaClient);

/* Tested */
const kafkaRouter = require('.').default;

describe('kafkaRouter', () => {
	test('kafkaRouter returns a router with the given config.', () => {
		mockGetSubscriber.mockReturnValue(mockSubscribe);
		const router = kafkaRouter(testConfig);

		router(routes);
		expect(mockKafkaClient.getSubscriber).toBeCalledWith(testConfig);
		expect(mockSubscribe).toBeCalledWith({
			topic: testTopicName,
			handler: testHandler,
		});
	});
});
