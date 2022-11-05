
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

const cloneAbstract = <T> ( value: T, visitor: { cloneArray, cloneArrayBuffer, cloneBoxedPrimitive, cloneDataView, cloneDate, cloneError, cloneMap, clonePlainObject, cloneRegExp, cloneSet, cloneTypedArray }, context? ): T => {

  if ( !isClonable ( value ) ) return value;

  const constructor = value['constructor'];

  if ( constructor === Array ) {

    return visitor.cloneArray ( value, context );

  } else if ( isPlainObject ( value ) ) {

    return visitor.clonePlainObject ( value, context );

  } else if ( constructor === Map ) {

    return visitor.cloneMap ( value, context );

  } else if ( constructor === Set ) {

    return visitor.cloneSet ( value, context );

  } else if ( constructor === Date ) {

    return visitor.cloneDate ( value, context );

  } else if ( constructor === RegExp ) {

    return visitor.cloneRegExp ( value, context );

  } else if ( constructor === ArrayBuffer ) {

    return visitor.cloneArrayBuffer ( value, context );

  } else if ( constructor === DataView ) {

    return visitor.cloneDataView ( value, context );

  } else if ( ArrayBuffer.isView ( value ) ) {

    return visitor.cloneTypedArray ( value, context );

  } else if ( constructor === Error || constructor === EvalError || constructor === RangeError || constructor === ReferenceError || constructor === SyntaxError || constructor === TypeError || constructor === URIError ) {

    return visitor.cloneError ( value, context );

  } else if ( isBoxedPrimitive ( value ) ) {

    return visitor.cloneBoxedPrimitive ( value, context );

  }

  throw new Error ( 'Value can not be cloned' );

};

/* EXPORT */

export default cloneAbstract;
