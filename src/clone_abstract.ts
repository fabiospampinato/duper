
/* HELPERS */

const {getPrototypeOf} = Object;
const {toString} = Object.prototype;

const isBoxedPrimitive = ( value: unknown ): boolean => {

  const tag = toString.call ( value );

  return ( tag === '[object BigInt]' || tag === '[object Boolean]' || tag === '[object Number]' || tag === '[object String]' || tag === '[object Symbol]' );

};

const isClonable = ( value: unknown ): boolean => {

  return ( typeof value === 'object' && value !== null );

};

const isPlainObject = ( value: unknown ): boolean => {

  if ( toString.call ( value ) !== '[object Object]' ) return false;

  const prototype = getPrototypeOf ( value );

  if ( prototype === null ) return true;

  return getPrototypeOf ( prototype ) === null;

};

/* MAIN */

const cloneAbstract = <T> ( value: T, visitor: { cloneArray, cloneArrayBuffer, cloneBoxedPrimitive, cloneDataView, cloneDate, cloneError, cloneMap, clonePlainObject, cloneRegExp, cloneSet, cloneTypedArray } ): T => {

  if ( !isClonable ( value ) ) return value;

  const constructor = value['constructor'];

  if ( constructor === Array ) {

    return visitor.cloneArray ( value );

  } else if ( isPlainObject ( value ) ) {

    return visitor.clonePlainObject ( value );

  } else if ( constructor === Map ) {

    return visitor.cloneMap ( value );

  } else if ( constructor === Set ) {

    return visitor.cloneSet ( value );

  } else if ( constructor === Date ) {

    return visitor.cloneDate ( value );

  } else if ( constructor === RegExp ) {

    return visitor.cloneRegExp ( value );

  } else if ( constructor === ArrayBuffer ) {

    return visitor.cloneArrayBuffer ( value );

  } else if ( constructor === DataView ) {

    return visitor.cloneDataView ( value );

  } else if ( ArrayBuffer.isView ( value ) ) {

    return visitor.cloneTypedArray ( value );

  } else if ( constructor === Error || constructor === EvalError || constructor === RangeError || constructor === ReferenceError || constructor === SyntaxError || constructor === TypeError || constructor === URIError ) {

    return visitor.cloneError ( value );

  } else if ( isBoxedPrimitive ( value ) ) {

    return visitor.cloneBoxedPrimitive ( value );

  }

  throw new Error ( 'Value can not be cloned' );

};

/* EXPORT */

export default cloneAbstract;
