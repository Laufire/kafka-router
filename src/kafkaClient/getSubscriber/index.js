import nodeKafka from 'node-rdkafka';
import logger from '../../base/logger';
import defaults from './defaults';

/* Exports */
const getSubscriber = ({
	kafkaConfig = {},
	listenerGenerators = {},
}) => {
	const extendedKafkaConfig = { ...defaults.kafkaConfig, ...kafkaConfig };
	const extendedGenerators = {
		...defaults.listenerGenerators,
		...listenerGenerators,
	};

	const consumer = new nodeKafka.KafkaConsumer(extendedKafkaConfig);

	return ({ topic, handler }) => {
		logger.info(`Preparing the consumer for the topic: ${ topic }`);

		Object.entries(extendedGenerators).forEach(([event, generator]) =>
			consumer.on(event, generator({ consumer, handler, topic })));

		consumer.connect();
	};
};

export default getSubscriber;
