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

  test('attaching cyoa to object works too', 3, function() {
      var elem = $('#qunit-fixture');
      var returned_elem = elem.Cyoa({});
      deepEqual(returned_elem, elem, 'The cyoa function called on an elem should return the elem');
      equal(typeof(returned_elem.cyoa), 'object', 'The returned elem should have the cyoa object added to it');
      elem.Cyoa({}, { 'start_page' : 'test'});
      equal(elem.cyoa.start_page, 'test', 'Should be able to set options with this construction');
  });

  test('tabletop_proxy returns undefined when option does not exist', 1, function() {
      equal(typeof(c1 = new $.Cyoa()['tabletop_proxy']), 'undefined', '`tabletop_proxy` is successfully undefined.');
  });
}(jQuery));
