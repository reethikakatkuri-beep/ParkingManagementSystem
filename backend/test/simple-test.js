const assert = require('assert');

describe('Simple Tests', () => {
  it('deploy to aws', () => {
    assert.strictEqual(1, 1);
    assert.strictEqual(2 + 2, 4);
    assert.strictEqual('test', 'test');
  });

  it('basic math', () => {
    assert.strictEqual(5 + 5, 10);
  });

  it('string test', () => {
    assert.strictEqual('hello', 'hello');
  });
});
