import logger from '../../../base/logger';
import parseJSON from '../../../utils/parseJSON';

const listenerGenerators = {
	'ready': ({ consumer, routes }) => () => {
		const topics = Object.keys(routes);

		topics.forEach((topic) => logger.info(`Subscribing to the topic: ${ topic }`));
		consumer.subscribe(topics);
		consumer.consume();
	},

	'data': ({ consumer, routes }) => (message) => {
		consumer.commit(message);
		const { topic } = message;

		logger.info(`Event from the topic ${ topic }`);
		try {
			const payload = parseJSON(message.value.toString());

			logger.info(`Handling an event for the topic ${ topic }`, { payload });
			routes[topic](payload, message);
		}
		catch (e) {
			consumer.emit('error', e);
		}
	},

	'disconnected': () => () => {
		logger.error('kafkaRouter disconnected.');
	},

	'event.error': () => (err) => {
		logger.error({
			message: 'Error from kafkaRouter.',
			err: err,
		});
	},
};

export default listenerGenerators;
