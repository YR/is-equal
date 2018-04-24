/**
 * Determine whether two objects are conceptually equal
 * https://github.com/yr/is-equal
 * @copyright Yr
 * @license MIT
 */
export type DebugFn = (str: string, ...rest: Array<any>) => void;

/**
 * Determine if 'obj1' and 'obj2' are conceptually equal optionally ignoring properties in 'ignore'
 */
export function isEqual(obj1: any, obj2: any, ignore?: Array<string>, debug?: DebugFn): boolean {
  ignore = ignore || [];

  if (equal(obj1, obj2)) return true;

  if (isObject(obj1) && isObject(obj2)) {
    const keys1 = keys(obj1, ignore);
    const keys2 = keys(obj2, ignore);

    if (keys1.length != keys2.length) return false;

    for (let i = 0, n = keys1.length; i < n; i++) {
      const prop = keys1[i];
      const val1 = obj1[prop];
      const val2 = obj2[prop];

      if (!equal(val1, val2)) {
        if (debug) debug('"%s" not equal %s:%s', prop, val1, val2);
        return false;
      }
    }
    return true;
  }
  return false;
}

/**
 * Determine if 'val1' and 'val2' are equal
 */
function equal(val1: any, val2: any): boolean {
  const type1 = typeof val1;
  const type2 = typeof val2;

  // Convert NaN to null
  if (type1 == 'number' && isNaN(val1)) val1 = null;
  if (type2 == 'number' && isNaN(val2)) val2 = null;

  return (
    val1 === val2 ||
    // Handle null & undefined
    (val1 == null && val2 == null) ||
    isEqualArray(val1, val2)
  );
}

/**
 * Determine if 'obj' is an object
 */
function isObject(obj: any): boolean {
  const type = typeof obj;

  return 'object' == type && !Array.isArray(obj);
}

/**
 * Retrieve non-ignored keys of 'obj'
 */
function keys(obj: { [key: string]: any }, ignore: Array<string>) {
  return Object.keys(obj).filter(key => {
    // Ignore functions
    return 'function' != typeof obj[key] && !~ignore.indexOf(key);
  });
}

/**
 * Determine if arrays 'arr1' and 'arr2' are equal
 */
function isEqualArray(arr1: any, arr2: any): boolean {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    const n1 = arr1.length;
    const n2 = arr2.length;

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
