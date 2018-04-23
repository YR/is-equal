/**
 * Determine whether two objects are conceptually equal
 * https://github.com/yr/is-equal
 * @copyright Yr
 * @license MIT
 */
export type DebugFn = (str: string, ...rest: any[]) => void;
type Indexable<T = any> = { [key: string]: T };
/**
 * Determine if 'obj1' and 'obj2' are conceptually equal optionally ignoring properties in 'ignoredObjectProps'
 */
export function isEqual(obj1: any, obj2: any, ignoredObjectProps: string[] = [], debug?: DebugFn): boolean {
  if (equal(obj1, obj2)) {
    return true;
  }

  if (isNonArrayObject(obj1) && isNonArrayObject(obj2)) {
    return isEqualObject(obj1, obj2, ignoredObjectProps, debug);
  }
  return false;
}

function isEqualObject(obj1: Indexable, obj2: Indexable, ignoredObjectProps: string[], debug?: DebugFn) {
  const ignoredProps = stringArrayToObject(ignoredObjectProps);
  const keys1 = nonFunctionKeys(obj1);
  const keys2 = nonFunctionKeys(obj2);

  if (keys1.length != keys2.length) {
    return false;
  }

  // https://stackoverflow.com/questions/17989270/for-loop-performance-storing-array-length-in-a-variable
  const keysLength = keys1.length;
  for (let i = 0; i < keysLength; i++) {
    const prop = keys1[i];
    const val1 = obj1[prop];
    const val2 = obj2[prop];

    if (!ignoredProps[prop] && !equal(val1, val2)) {
      if (debug) {
        debug('"%s" not equal %s:%s', prop, val1, val2);
      }
      return false;
    }
  }
  return true;
}

/**
 * Determine if 'val1' and 'val2' are equal
 */
function equal(val1: any, val2: any): boolean {
  if (isEqualNaN(val1, val2)) {
    return true;
  } else if (Array.isArray(val1) && Array.isArray(val2)) {
    return isEqualArray(val1, val2);
  } else {
    return val1 === val2 || (val1 == null && val2 == null);
  }
}

/**
 * Determine if 'obj' is an object
 */
function isNonArrayObject(obj: any): obj is Indexable {
  return typeof obj === 'object' && !Array.isArray(obj);
}

/**
 * Retrieve non-ignored nonFunctionKeys of 'obj'
 */
function nonFunctionKeys(obj: Indexable) {
  return Object.keys(obj).filter(key => typeof obj[key] !== 'function');
}

/**
 * Determine if arrays 'arr1' and 'arr2' are equal
 */
function isEqualArray(arr1: any[], arr2: any[]): boolean {
  if (arr1 === arr2) {
    return true;
  }

  if (arr1.length === 0 && arr2.length === 0) {
    return true;
  }

  if (arr1.length != arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function isEqualNaN(val1: any, val2: any) {
  return typeof val1 == 'number' && isNaN(val1) && typeof val2 == 'number' && isNaN(val2);
}

function stringArrayToObject(strings: string[]) {
  return strings.reduce(
    (acc, val) => {
      acc[val] = true;
      return acc;
    },
    {} as Indexable<boolean>
  );
}
