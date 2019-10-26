import logger from './base/logger';
import kafkaClient from './kafkaClient';

/* Exports */
const kafkaRouter = (config) => (routes) => {
	const { getSubscriber } = kafkaClient;
	const subscribe = getSubscriber(config);

	Object.entries(routes).forEach(([topic, handler]) => {
		logger.info(`Setting up the route: ${ topic }`);
		subscribe({ topic, handler });
	});
};

export default kafkaRouter;
