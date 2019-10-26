/* Mocks and Stubs */
const testConfig = Symbol('config');
const testHandler = Symbol('subscription');
const testTopicName = 'testTopic';
const subscriptions = {
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

		router(subscriptions);
		expect(mockKafkaClient.getSubscriber).toBeCalledWith(testConfig);
		expect(mockSubscribe).toBeCalledWith({
			topic: testTopicName,
			handler: testHandler,
		});
	});
});
