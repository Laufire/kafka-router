import kafkaClient from './kafkaClient';

/* Exports */
const kafkaRouter = (config) => (routes) => {
	const { generatedSubscriber } = kafkaClient;
	const subscribe = generatedSubscriber(config);

	subscribe({ routes });
};

export default kafkaRouter;
