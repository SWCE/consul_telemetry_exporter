const mocha = require('mocha');
const expect = require('expect.js');

const describe = mocha.describe;
const it = mocha.it;

const prometheus = require('../../lib/prometheus');

describe('prometheus test', function () {

  it('should remove dot', function() {
    expect(prometheus.sanitize('.')).to.be('_');
  });

});
