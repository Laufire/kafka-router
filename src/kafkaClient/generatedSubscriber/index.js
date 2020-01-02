import nodeKafka from 'node-rdkafka';

import logger from '../../base/logger';
import defaults from './defaults';

/* Exports */
const generatedSubscriber = ({
	kafkaConfig = {},
	listenerGenerators = {},
}) => {
	const extendedKafkaConfig = { ...defaults.kafkaConfig, ...kafkaConfig };
	const extendedGenerators = {
		...defaults.listenerGenerators,
		...listenerGenerators,
	};

	return ({ routes }) => {
		logger.info('Preparing kafkaRouter...');

		const consumer = new nodeKafka.KafkaConsumer(extendedKafkaConfig);

		Object.entries(extendedGenerators).forEach(([event, generator]) =>
			consumer.on(event, generator({ consumer, routes })));

		consumer.connect();
	};
};

export default generatedSubscriber;
