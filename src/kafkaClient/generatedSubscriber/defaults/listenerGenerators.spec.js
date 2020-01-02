/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */

import logger from '../../../base/logger';
import listenerGenerators from './listenerGenerators';

/* Mocks and Stubs */
const mockConsumer = {
	on: jest.fn(),
	subscribe: jest.fn(),
	consume: jest.fn(),
	commit: jest.fn(),
	emit: jest.fn(),
};
const mockRoute = 'mockRoute';
const mockHandler = jest.fn();
const mockRoutes = {
	[mockRoute]: mockHandler,
};

/* Tests */
describe('listenerGenerators', () => { // eslint-disable-line max-lines-per-function
	beforeEach(() => {
	});

	test('ready generates a handler for '
		+ 'the event of the same name.', () => {
		const readyListener = listenerGenerators.ready({
			consumer: mockConsumer,
			routes: mockRoutes,
		});

		readyListener();

		expect(logger.info).toHaveBeenCalledWith(expect.any(String));
		expect(mockConsumer.subscribe).toHaveBeenCalledWith([mockRoute]);
		expect(mockConsumer.consume).toHaveBeenCalled();
	});

	test('data generates a handler for '
		+ 'the event of the same name.', () => {
		const dataListener = listenerGenerators.data({
			consumer: mockConsumer,
			routes: mockRoutes,
			handler: mockHandler,
		});
		const mockValueString = Symbol('Some Value');
		const mockMessage = {
			topic: mockRoute,
			value: {
				toString: () => mockValueString,
			},
		};
		const mockPayload = Symbol('payload');
		const mockParseFn = jest.fn();

		mockParseFn.mockReturnValue(mockPayload);
		JSON.parse = mockParseFn;

		dataListener(mockMessage);

		expect(mockConsumer.commit).toHaveBeenCalledWith(mockMessage);
		expect(logger.info).toHaveBeenCalledWith(expect.any(String));
		expect(mockParseFn).toHaveBeenCalledWith(mockValueString);
		expect(mockHandler).toHaveBeenCalledWith(mockPayload, mockMessage);
	});

	test('errors data handler are handled by'
		+ ' the error event handler.', () => {
		const customError = new Error('CustomError');
		const dataListener = listenerGenerators.data({
			consumer: mockConsumer,
			routes: {
				[mockRoute]: () => {
					throw customError;
				},
			},
		});

		dataListener({
			topic: mockRoute,
			value: '{}',
		});

		expect(mockConsumer.emit)
			.toHaveBeenCalledWith('error', customError);
	});

	test('disconnected generates a handler for '
		+ 'the event of the same name.', () => {
		const disconnectedListener = listenerGenerators.disconnected({
			routes: mockRoutes,
		});

		disconnectedListener();

		expect(logger.error).toHaveBeenCalledWith(expect.any(String));
	});

	test('error generates a handler for '
		+ 'the event of the same name.', () => {
		const errorListener = listenerGenerators['event.error']({
			routes: mockRoutes,
		});
		const mockError = Symbol('mockError');

		errorListener(mockError);

		expect(logger.error).toHaveBeenCalledWith({
			err: mockError,
			message: expect.any(String),
		});
	});
});
