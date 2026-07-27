import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(
  new URL('../src/security/restricted-expression.js', import.meta.url),
  'utf8'
);
const sandbox = { globalThis: {} };
vm.runInNewContext(source, sandbox);
const expression = sandbox.globalThis.SpatialExpression;

test('evaluates arithmetic and field references', () => {
  assert.equal(expression.evaluate('[population] / AREA', { population: 1000, AREA: 20 }), 50);
});

test('supports only explicitly allowed functions', () => {
  assert.equal(
    expression.evaluate(
      'ROUND([price] * 1.05, 2)',
      { price: 10 },
      {
        ROUND: (value, digits) => Number(value.toFixed(digits)),
      }
    ),
    10.5
  );
  assert.throws(() => expression.evaluate('constructor(1)', {}, {}), /not allowed/);
});

test('rejects JavaScript property access and statements', () => {
  assert.throws(
    () => expression.evaluate('x.constructor', { x: 1 }),
    /Unsupported expression character/
  );
  assert.throws(() => expression.evaluate('1; alert(1)', {}), /Unsupported expression character/);
});

test('rejects division by zero', () => {
  assert.throws(() => expression.evaluate('10 / 0', {}), /Division by zero/);
});
