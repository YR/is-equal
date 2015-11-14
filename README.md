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