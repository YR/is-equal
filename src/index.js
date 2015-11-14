'use strict';

/**
 * Determine if 'obj1' and 'obj2' are conceptually equal,
 * optionally ignoring properties in 'ignore'
 * @param {Object} obj1
 * @param {Object} obj2
 * @param {Array} [ignore]
 * @param {Debug} [debug]
 * @returns {Boolean}
 */
module.exports = function isEqual (obj1, obj2, ignore, debug) {
  ignore = ignore || [];

  if (equal(obj1, obj2)) return true;

  if (isObject(obj1) && isObject(obj2)) {
    const keys1 = keys(obj1, ignore)
      , keys2 = keys(obj2, ignore);

    if (keys1.length != keys2.length) return false;

    for (let i = 0, n = keys1.length; i < n; i++) {
      const prop = keys1[i]
        , val1 = obj1[prop]
        , val2 = obj2[prop];

      if (!equal(val1, val2)) {
        if (debug) debug('"%s" not equal %s:%s', prop, val1, val2);
        return false;
      }
    }
    return true;
  }
  return false;
};

/**
 * Determine if 'val1' and 'val2' are equal
 * @param {Object} val1
 * @param {Object} val2
 * @returns {Boolean}
 */
function equal (val1, val2) {
  const type1 = typeof val1
    , type2 = typeof val2;

  // Convert NaN to null
  if (type1 == 'number' && isNaN(val1)) val1 = null;
  if (type2 == 'number' && isNaN(val2)) val2 = null;

  return (val1 === val2)
    // Handle null & undefined
    || (val1 == null && val2 == null)
    || isEqualArray(val1, val2);
}

/**
 * Determine if 'obj' is an object
 * @param {Object} obj
 * @returns {Boolean}
 */
function isObject (obj) {
  const type = typeof obj;

  return 'object' == type
    && 'function' != type
    && !Array.isArray(obj);
}

/**
 * Retrieve non-ignored keys of 'obj'
 * @param {Object} obj
 * @param {Array} ignore
 * @returns {Array}
 */
function keys (obj, ignore) {
  return Object.keys(obj).filter((key) => {
    // Ignore functions
    return 'function' != typeof obj[key]
      && !~ignore.indexOf(key);
  });
}

/**
 * Determine if arrays 'arr1' and 'arr2' are equal
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Boolean}
 */
function isEqualArray (arr1, arr2) {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    const n1 = arr1.length
      , n2 = arr2.length;

    if (n1 != n2) return false;
    // Equal if both empty
    if (n1 == 0 && n2 == 0) return true;

    // Not equal if items not strictly equal
    for (let i = 0; i < n1; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
  return false;
}