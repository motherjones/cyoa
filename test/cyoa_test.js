/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('jQuery#awesome', {
    setup: function() {
    }
  });

  test('returns cyoa object', 1, function() {
      equal(typeof(new $.Cyoa()), 'object');
  });

  test('checks start page can be set w/ option argument', 1, function() {
      equal(new $.Cyoa({}, {'start_page': 'test'}).start_page, 'test');
  });

  test('checks containing element can be set w/ option argument', 1, function() {
      equal(new $.Cyoa({}, {'container': 'test'}).container, 'test');
  });
}(jQuery));
