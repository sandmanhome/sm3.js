'use strict';
/* global describe it */

var assert = require('assert');
var hash = require('../');

describe('Hash', function () {
  function test(fn, cases) {
    for (var i = 0; i < cases.length; i++) {
      var msg = cases[i][0];
      var res = cases[i][1];
      var enc = cases[i][2];

      var dgst = fn().update(msg, enc).digest('hex');
      assert.equal(dgst, res);

      // Split message
      dgst = fn().update(msg.slice(0, 2), enc)
        .update(msg.slice(2), enc)
        .digest('hex');
      assert.equal(dgst, res);
    }
  }

  it('should support sm3', function () {
    assert.equal(hash.sm3.blockSize, 512);
    assert.equal(hash.sm3.outSize, 256);

    test(hash.sm3, [
      ['abc',
        '66c7f0f462eeedd9d1f2d46bdc10e4e24167c4875cf2f7a2297da02b8f4ba8e0'
      ],
      [
        'abcdefghABCDEFGH12345678',
        'd670c7f027fd5f9f0c163f4bfe98f9003fe597d3f52dbab0885ec2ca8dd23e9b',
      ],
      [
        'abcdefghABCDEFGH12345678abcdefghABCDEFGH12345678abcdefgh',
        '1cf3bafec325d7d9102cd67ba46b09195af4e613b6c2b898122363d810308b11',
      ],
      [
        'abcdefghABCDEFGH12345678abcdefghABCDEFGH12345678abcdefghABCD',
        'b8ac4203969bde27434ce667b0adbf3439ee97e416e73cb96f4431f478a531fe',
      ],
      [
        'abcdefghABCDEFGH12345678abcdefghABCDEFGH12345678abcdefghABCDEFGH',
        '5ef0cdbe0d54426eea7f5c8b44385bb1003548735feaa59137c3dfe608aa9567',
      ]
    ]);
  });

});
