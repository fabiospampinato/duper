
/* IMPORT */

import cloneAbstract from './clone_abstract';

/* HELPERS */

const cloneSymbols = ( target: object, source: object, cache: Map<unknown, unknown> ) => {

  const symbols = Object.getOwnPropertySymbols ( source );

  for ( let i = 0, l = symbols.length; i < l; i++ ) {

    const symbol = symbols[i];

    target[symbol] = cloneGeneral ( source[symbol], cache );

  }

  return target;

};

const cloneArray = ( value: unknown[], cache: Map<unknown, unknown> ) => {

  const clone = new Array ( value.length );

  cache.set ( value, clone );

  for ( let i = 0, l = value.length; i < l; i++ ) {

    clone[i] = cloneGeneral ( value[i], cache );

  }

  return cloneSymbols ( clone, value, cache );

};

const cloneArrayBuffer = ( value: ArrayBuffer, cache: Map<unknown, unknown> ) => {

  return cloneSymbols ( value.slice ( 0, Infinity ), value, cache );

};

const cloneBoxedPrimitive = ( value: object, cache: Map<unknown, unknown> ) => {

  return cloneSymbols ( Object ( value.valueOf () ), value, cache );

};

const cloneDataView = ( value: DataView, cache: Map<unknown, unknown> ) => {

  return cloneSymbols ( new DataView ( value.buffer, value.byteOffset, value.byteLength ), value, cache );

};

const cloneDate = ( value: Date, cache: Map<unknown, unknown> ) => {

  return cloneSymbols ( new Date ( value.getTime () ), value, cache );

};

const cloneError = ( value: Error | EvalError | RangeError | ReferenceError | SyntaxError | TypeError | URIError, cache: Map<unknown, unknown> ) => {

  return cloneSymbols ( Object.assign ( value.constructor ( value.message ), value ), value, cache );

};

const cloneMap = ( value: Map<unknown, unknown>, cache: Map<unknown, unknown> ) => {

  const clone = new Map ();

  cache.set ( value, clone );

  for ( const [key, val] of value.entries () ) {

    clone.set ( cloneGeneral ( key, cache ), cloneGeneral ( val, cache ) );

  }

  return cloneSymbols ( clone, value, cache );

};

const clonePlainObject = ( value: Record<string | number | symbol, unknown>, cache: Map<unknown, unknown> ) => {

  const clone = {};

  cache.set ( value, clone );

  for ( const key in value ) {

    clone[key] = cloneGeneral ( value[key], cache );

  }

  return cloneSymbols ( clone, value, cache );

};

const cloneRegExp = ( value: RegExp, cache: Map<unknown, unknown> ) => {

  return cloneSymbols ( new RegExp ( value.source, value.flags ), value, cache );

};

const cloneSet = ( value: Set<unknown>, cache: Map<unknown, unknown> ) => {

  const clone = new Set ();

  cache.set ( value, clone );

  for ( const val of value.values () ) {

    clone.add ( cloneGeneral ( val, cache ) );

  }

  return cloneSymbols ( clone, value, cache );

};

const cloneTypedArray = ( value: Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array, cache: Map<unknown, unknown> ) => {

  return cloneSymbols ( value.slice (), value, cache );

};

const cloneGeneral = (() => {

  const visitors = { cloneArray, cloneArrayBuffer, cloneBoxedPrimitive, cloneDataView, cloneDate, cloneError, cloneMap, clonePlainObject, cloneRegExp, cloneSet, cloneTypedArray };

  return <T> ( value: T, cache: Map<unknown, unknown> ): T => {

    const cached = cache.get ( value );

    if ( cached ) return cached as T; //TSC

    return cloneAbstract ( value, visitors, cache );

  };

})();

/* MAIN */

const cloneDeep = <T> ( value: T ): T => {

  return cloneGeneral ( value, new Map () );

};

/* EXPORT */

export default cloneDeep;
