/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */

/* Mocks and Stubs */
const mockConsumer = {
	on: jest.fn(),
	connect: jest.fn(),
};
const mockKafkaConsumer = jest.fn();
const mockNodeKafka = {
	KafkaConsumer: mockKafkaConsumer,
};
const mockEventName = 'mockEvent';
const mockListenerGeneratorVal = Symbol('mockListenerGenerator');
const mockListenerGenerator = jest.fn();
const mockListenerGenerators = {
	[mockEventName]: mockListenerGenerator,
};
const customEventName = 'customEvent';
const customListGeneratorVal = Symbol('customListGenerator');
const customListGenerator = jest.fn();
const customListGenerators = {
	[customEventName]: customListGenerator,
};

mockListenerGenerator.mockReturnValue(mockListenerGeneratorVal);
customListGenerator.mockReturnValue(customListGeneratorVal);

describe('generatedSubscriber', () => {
	beforeEach(() => {
		jest.mock('node-rdkafka', () => mockNodeKafka);
		mockKafkaConsumer.mockImplementation(() => mockConsumer);
		jest.mock('./defaults/listenerGenerators',
			() => mockListenerGenerators);
	});

	test('generatedSubscriber sets up a kafkaConsumer with'
		+ ' the provided config extended with defaults.', () => {
		const generatedSubscriber = require('.').default;
		const defaults = require('./defaults').default;
		const customKafkaConfig = {
			customConfigValue: Symbol('customConfigValue'),
		};
		const subscriber = generatedSubscriber({
			kafkaConfig: customKafkaConfig,
			listenerGenerators: customListGenerators,
		});
		const extendedKafkaConfig = {
			...defaults.kafkaConfig,
			...customKafkaConfig,
		};
		const extListenerGenerators = {
			...defaults.listenerGenerators,
			...customListGenerators,
		};

		const handler = Symbol('handler');
		const topic = 'someTopic';

		subscriber({ handler, topic });

		expect(mockKafkaConsumer).toBeCalledWith(extendedKafkaConfig);
		Object.entries(extListenerGenerators)
			.forEach(([event, generator], index) => {
				expect(generator).toBeCalledWith({
					consumer: mockConsumer,
					handler: handler,
					topic: topic,
				});
				expect(mockConsumer.on).toHaveBeenNthCalledWith(
					index + 1, event, generator()
				);
			});
		expect(mockConsumer.connect).toHaveBeenCalled();
	});

	test('generatedSubscriber config values are optional.', () => {
		const generatedSubscriber = require('.').default;

		generatedSubscriber({});
	});
});
