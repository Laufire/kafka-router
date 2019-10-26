import defaults from '.';
import kafkaConfig from './kafkaConfig';
import listenerGenerators from './listenerGenerators';
describe('getSubscriber config defaults', () => {
	test('defaults is a collections of other default values.', () => {
		expect(defaults).toEqual({
			kafkaConfig,
			listenerGenerators,
		});
	});
});
