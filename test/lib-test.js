'use strict';

var expect, isEqual;

// Make it work in browser
try {
  isEqual = require('src/index.js');
  expect = window.expect;
// .. or Node
} catch (err) {
  isEqual = require('../src/index.js');
  expect = require('expect.js');
}

describe('isEqual', function () {
  it('should return "false" for non-objects', function () {
    expect(isEqual([], 'foo')).to.equal(false);
  });
  it('should return "true" for same objects', function () {
    var obj = {};

    expect(isEqual(obj, obj)).to.equal(true);
    expect(isEqual(obj, {})).to.equal(true);
    expect(isEqual([], [])).to.equal(true);
    expect(isEqual(['foo'], ['foo'])).to.equal(true);
    expect(isEqual(['foo', 'bar'], ['bar', 'foo'])).to.equal(false);
    expect(isEqual(null, null)).to.equal(true);
    expect(isEqual(null, undefined)).to.equal(true);
    expect(isEqual(undefined, undefined)).to.equal(true);
    expect(isEqual(NaN, NaN)).to.equal(true);
    expect(isEqual(null, NaN)).to.equal(true);
    expect(isEqual(undefined, NaN)).to.equal(true);
  });
  it('should return "true" for objects with same properties', function () {
    expect(isEqual({ foo: 'foo', bar: true }, { bar: true, foo: 'foo' })).to.equal(true);
    expect(isEqual({ foo: null }, { foo: null })).to.equal(true);
    expect(isEqual({ foo: null }, { foo: undefined })).to.equal(true);
    expect(isEqual({ foo: undefined }, { foo: undefined })).to.equal(true);
    expect(isEqual({ foo: NaN }, { foo: NaN })).to.equal(true);
    expect(isEqual({ foo: null }, { foo: NaN })).to.equal(true);
    expect(isEqual({ foo: undefined }, { foo: NaN })).to.equal(true);
  });
  it('should return "true" for objects with same array properties', function () {
    expect(isEqual({ foo: [] }, { foo: [] })).to.equal(true);
    expect(isEqual({ foo: ['foo', 'bar'] }, { foo: ['foo', 'bar'] })).to.equal(true);
    expect(isEqual({ foo: ['foo', 'bar'] }, { foo: ['bar', 'foo'] })).to.equal(false);
  });
  it('should return "false" for objects with almost same properties', function () {
    expect(isEqual({ foo: 'foo', bar: true, boo: {} }, { bar: true, foo: 'foo', boo: {} })).to.equal(false);
    expect(isEqual({ foo: 'foo', bar: true, boo: {} }, { bar: true, foo: 'foo' })).to.equal(false);
    expect(isEqual({ foo: 'foo', bar: true }, { bar: true, foo: 'foo', boo: {} })).to.equal(false);
  });
  it('should skip function properties', function () {
    expect(isEqual({ foo: 'bar', bar: function () {} }, { foo: 'bar' })).to.equal(true);
  });
  it('should skip ignorable properties', function () {
    expect(isEqual({ foo: 'bar', bar: true }, { bar: true, foo: 'foo' }, ['foo'])).to.equal(true);
  });
});