(function (global) {
  'use strict';

  var OPERATORS = {
    '||': {
      precedence: 1,
      apply: function (a, b) {
        return a || b;
      },
    },
    '&&': {
      precedence: 2,
      apply: function (a, b) {
        return a && b;
      },
    },
    '==': {
      precedence: 3,
      apply: function (a, b) {
        return a == b;
      },
    }, // intentional calculator coercion
    '!=': {
      precedence: 3,
      apply: function (a, b) {
        return a != b;
      },
    },
    '===': {
      precedence: 3,
      apply: function (a, b) {
        return a === b;
      },
    },
    '!==': {
      precedence: 3,
      apply: function (a, b) {
        return a !== b;
      },
    },
    '<': {
      precedence: 4,
      apply: function (a, b) {
        return a < b;
      },
    },
    '<=': {
      precedence: 4,
      apply: function (a, b) {
        return a <= b;
      },
    },
    '>': {
      precedence: 4,
      apply: function (a, b) {
        return a > b;
      },
    },
    '>=': {
      precedence: 4,
      apply: function (a, b) {
        return a >= b;
      },
    },
    '+': {
      precedence: 5,
      apply: function (a, b) {
        return a + b;
      },
    },
    '-': {
      precedence: 5,
      apply: function (a, b) {
        return Number(a) - Number(b);
      },
    },
    '*': {
      precedence: 6,
      apply: function (a, b) {
        return Number(a) * Number(b);
      },
    },
    '/': {
      precedence: 6,
      apply: function (a, b) {
        if (Number(b) === 0) throw new Error('Division by zero');
        return Number(a) / Number(b);
      },
    },
    '%': {
      precedence: 6,
      apply: function (a, b) {
        return Number(a) % Number(b);
      },
    },
  };

  function tokenize(source) {
    var input = String(source || '');
    var tokens = [];
    var index = 0;
    while (index < input.length) {
      var char = input[index];
      if (/\s/.test(char)) {
        index++;
        continue;
      }
      if (char === '[') {
        var closeBracket = input.indexOf(']', index + 1);
        if (closeBracket < 0) throw new Error('Unclosed field reference');
        tokens.push({ type: 'identifier', value: input.slice(index + 1, closeBracket) });
        index = closeBracket + 1;
        continue;
      }
      if (char === '!') {
        var closeBang = input.indexOf('!', index + 1);
        if (closeBang > index + 1) {
          tokens.push({ type: 'identifier', value: input.slice(index + 1, closeBang) });
          index = closeBang + 1;
          continue;
        }
      }
      if (char === '"' || char === "'") {
        var quote = char;
        var value = '';
        index++;
        while (index < input.length && input[index] !== quote) {
          if (input[index] === '\\') {
            index++;
            if (index >= input.length) throw new Error('Invalid string escape');
            var escapes = { n: '\n', r: '\r', t: '\t' };
            value += escapes[input[index]] || input[index];
          } else {
            value += input[index];
          }
          index++;
        }
        if (input[index] !== quote) throw new Error('Unclosed string');
        index++;
        tokens.push({ type: 'literal', value: value });
        continue;
      }
      var number = input.slice(index).match(/^(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/i);
      if (number) {
        tokens.push({ type: 'literal', value: Number(number[0]) });
        index += number[0].length;
        continue;
      }
      var identifier = input.slice(index).match(/^[A-Za-z_][A-Za-z0-9_]*/);
      if (identifier) {
        var word = identifier[0];
        var lower = word.toLowerCase();
        if (lower === 'true') tokens.push({ type: 'literal', value: true });
        else if (lower === 'false') tokens.push({ type: 'literal', value: false });
        else if (lower === 'null') tokens.push({ type: 'literal', value: null });
        else tokens.push({ type: 'identifier', value: word });
        index += word.length;
        continue;
      }
      var operator = [
        '===',
        '!==',
        '>=',
        '<=',
        '==',
        '!=',
        '&&',
        '||',
        '+',
        '-',
        '*',
        '/',
        '%',
        '<',
        '>',
      ].find(function (candidate) {
        return input.slice(index, index + candidate.length) === candidate;
      });
      if (operator) {
        tokens.push({ type: 'operator', value: operator });
        index += operator.length;
        continue;
      }
      if ('(),'.indexOf(char) >= 0) {
        tokens.push({ type: char, value: char });
        index++;
        continue;
      }
      throw new Error('Unsupported expression character: ' + char);
    }
    tokens.push({ type: 'eof' });
    return tokens;
  }

  function evaluate(source, context, functions) {
    var tokens = tokenize(source);
    var position = 0;
    var values = context || {};
    var allowedFunctions = functions || {};
    function peek() {
      return tokens[position];
    }
    function take(type) {
      var token = tokens[position];
      if (type && token.type !== type) throw new Error('Expected ' + type);
      position++;
      return token;
    }
    function primary() {
      var token = take();
      if (token.type === 'literal') return token.value;
      if (token.type === '(') {
        var grouped = expression(0);
        take(')');
        return grouped;
      }
      if (token.type === 'operator' && (token.value === '+' || token.value === '-')) {
        var signed = Number(primary());
        return token.value === '-' ? -signed : signed;
      }
      if (token.type !== 'identifier') throw new Error('Expected a value');
      if (peek().type === '(') {
        take('(');
        var args = [];
        if (peek().type !== ')') {
          args.push(expression(0));
          while (peek().type === ',') {
            take(',');
            args.push(expression(0));
          }
        }
        take(')');
        var functionName = token.value.toUpperCase();
        if (!Object.prototype.hasOwnProperty.call(allowedFunctions, functionName)) {
          throw new Error('Function is not allowed: ' + token.value);
        }
        return allowedFunctions[functionName].apply(null, args);
      }
      if (Object.prototype.hasOwnProperty.call(values, token.value)) return values[token.value];
      var insensitive = Object.keys(values).find(function (key) {
        return key.toLowerCase() === token.value.toLowerCase();
      });
      if (insensitive) return values[insensitive];
      return null;
    }
    function expression(minimumPrecedence) {
      var left = primary();
      while (peek().type === 'operator') {
        var operation = OPERATORS[peek().value];
        if (!operation || operation.precedence < minimumPrecedence) break;
        take('operator');
        var right = expression(operation.precedence + 1);
        left = operation.apply(left, right);
      }
      return left;
    }
    var result = expression(0);
    if (peek().type !== 'eof') throw new Error('Unexpected token');
    return result;
  }

  global.SpatialExpression = Object.freeze({ evaluate: evaluate, tokenize: tokenize });
})(typeof window !== 'undefined' ? window : globalThis);
