
/**
 * Dependencies.
 */

var Sniffer = require('..');
var assert = require('assert');

/**
 * Tests.
 */

describe('Sniffer()', function() {
  it('should be a function', function() {
    assert.equal(typeof Sniffer, 'function');
  });

  it('should be a constructor', function() {
    var sniffer = new Sniffer();
    assert(sniffer instanceof Sniffer);
  });

  it('should not require the new keyword', function() {
    var sniffer = Sniffer();
    assert(sniffer instanceof Sniffer);
  });
});

describe('Sniffer#start', function() {
  it('should be a function', function() {
    var sniffer = Sniffer();
    assert.equal(typeof sniffer.start, 'function');
  });
});

describe('Sniffer#stop', function() {
  it('should be a function', function() {
    var sniffer = Sniffer();
    assert.equal(typeof sniffer.stop, 'function');
  });
});
