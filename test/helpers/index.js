/**
 *
 * Helper functions for testing.
 */

const expectMockCalls = (fn) => (expectation) =>
	expect(fn.mock.calls).toEqual(expectation);

const forceRequire = (module) => { // #TODO: Fix. Module paths wont work due the inability in resolving paths, relative to the calling module.
	jest.unmock(module);
	return require(module);
}

module.exports = {
	expectMockCalls,
	forceRequire,
};
