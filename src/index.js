import logger from './base/logger';
import kafkaClient from './kafkaClient';

/* Exports */
const kafkaRouter = (config) => (routes) => {
	const { generatedSubscriber } = kafkaClient;
	const subscribe = generatedSubscriber(config);

	Object.entries(routes).forEach(([topic, handler]) => {
		logger.info(`Setting up the route: ${ topic }`);
		subscribe({ topic, handler });
	});
};

export default kafkaRouter;
