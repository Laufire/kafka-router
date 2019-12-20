import logger from '../../../base/logger';
import parseJSON from '../../../utils/parseJSON';

const listenerGenerators = {
	'ready': ({ consumer, topic }) => () => {
		logger.info(`Subscribing to the topic: ${ topic }`);
		consumer.subscribe([topic]);
		consumer.consume();
	},

	'data': ({ consumer, topic, handler }) => (message) => {
		consumer.commit(message);
		logger.info(`Event from the topic ${ topic }`);
		try {
			const payload = parseJSON(message.value.toString());

			logger.info(`Handling an event for the topic ${ topic }`, { payload });
			handler(payload, message);
		}
		catch (e) {
			consumer.emit('error', e);
		}
	},

	'disconnected': ({ topic }) => () => {
		logger.error(`Consumer disconnected from the topic: ${ topic }`);
	},

	'event.error': ({ topic }) => (err) => {
		logger.error({
			message: `Error from the topic: ${ topic }`,
			err: err,
		});
	},
};

export default listenerGenerators;
