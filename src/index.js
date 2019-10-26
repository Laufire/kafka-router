import logger from './base/logger';
import kafkaClient from './kafkaClient';

/* Exports */
const kafkaRouter = (config) => (subscriptions) => {
	const { getSubscriber } = kafkaClient;
	const subscribe = getSubscriber(config);

	Object.entries(subscriptions).forEach(([topic, handler]) => {
		logger.info(`Setting up the subscription: ${ topic }`);
		subscribe({ topic, handler });
	});
};

export default kafkaRouter;
