[![NPM Version](https://img.shields.io/npm/v/@yr/is-equal.svg?style=flat)](https://npmjs.org/package/@yr/is-equal)
[![Build Status](https://img.shields.io/travis/YR/is-equal.svg?style=flat)](https://travis-ci.org/YR/is-equal?branch=master)

Determine whether two objects are conceptually equal.

## Usage

```js
const isEqual = require('@yr/is-equal')
  , obj = {};

// The following are all 'true'
isEqual(obj, {});
isEqual([], []);
isEqual(['foo'], ['foo']);
isEqual(null, null);
isEqual(NaN, NaN);
isEqual({ foo: 'foo', bar: true }, { bar: true, foo: 'foo' });
isEqual({ foo: null }, { foo: null });
isEqual({ foo: ['foo', 'bar'] }, { foo: ['foo', 'bar'] });
// Function properties are ignored
isEqual({ foo: 'bar', bar: function () {} }, { foo: 'bar' });
// Optional ignored properties
isEqual({ foo: 'bar', bar: true }, { bar: true, foo: 'foo' }, ['foo']);
```