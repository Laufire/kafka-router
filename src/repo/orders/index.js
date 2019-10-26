import { logger } from '../../../base/logger';

/* Exports */
const orders = {
	write: (data) => {
		logger.info(data);
	},
};

export {
	orders,
};
