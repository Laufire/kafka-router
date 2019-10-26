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

	return ({ topic, handler }) => {
		logger.info(`Setting up the topic: ${ topic }.`);

		const consumer = new nodeKafka.KafkaConsumer(extendedKafkaConfig);

		Object.entries(extendedGenerators).forEach(([event, generator]) =>
			consumer.on(event, generator({ consumer, handler, topic })));

		consumer.connect();
	};
};

export default getSubscriber;
