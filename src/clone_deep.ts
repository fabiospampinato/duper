
/* IMPORT */

import cloneAbstract from './clone_abstract';

/* HELPERS */

const cloneSymbols = ( target: object, source: object ) => {

  const symbols = Object.getOwnPropertySymbols ( source );

  for ( let i = 0, l = symbols.length; i < l; i++ ) {

    const symbol = symbols[i];

    target[symbol] = cloneDeep ( source[symbol] );

  }

  return target;

};

const cloneArray = ( value: unknown[] ) => {

  return cloneSymbols ( value.map ( cloneDeep ), value );

};

const cloneArrayBuffer = ( value: ArrayBuffer ) => {

  return cloneSymbols ( value.slice ( 0, Infinity ), value );

};

const cloneBoxedPrimitive = ( value: object ) => {

  return cloneSymbols ( Object ( value.valueOf () ), value );

};

const cloneDataView = ( value: DataView ) => {

  return cloneSymbols ( new DataView ( value.buffer, value.byteOffset, value.byteLength ), value );

};

const cloneDate = ( value: Date ) => {

  return cloneSymbols ( new Date ( value.getTime () ), value );

};

const cloneError = ( value: Error | EvalError | RangeError | ReferenceError | SyntaxError | TypeError | URIError ) => {

  return cloneSymbols ( Object.assign ( value.constructor ( value.message ), value ), value );

};

const cloneMap = ( value: Map<unknown, unknown> ) => {

  return cloneSymbols ( new Map ( Array.from ( value.entries () ).map ( entry => [cloneDeep ( entry[0] ), cloneDeep ( entry[1] )] ) ), value );

};

const clonePlainObject = ( value: Record<string | number | symbol, unknown> ) => {

  return cloneSymbols ( Object.fromEntries ( Object.entries ( value ).map ( entry => [entry[0], cloneDeep ( entry[1] )] ) ), value );

};

const cloneRegExp = ( value: RegExp ) => {

  return cloneSymbols ( new RegExp ( value.source, value.flags ), value );

};

const cloneSet = ( value: Set<unknown> ) => {

  return cloneSymbols ( new Set ( Array.from ( value.values () ).map ( cloneDeep ) ), value );

};

const cloneTypedArray = ( value: Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array ) => {

  return cloneSymbols ( value.slice (), value );

};

/* MAIN */

const cloneDeep = (() => {

  const visitors = { cloneArray, cloneArrayBuffer, cloneBoxedPrimitive, cloneDataView, cloneDate, cloneError, cloneMap, clonePlainObject, cloneRegExp, cloneSet, cloneTypedArray };

  return <T> ( value: T ): T => {

    return cloneAbstract ( value, visitors );

  };

})();

/* EXPORT */

export default cloneDeep;
