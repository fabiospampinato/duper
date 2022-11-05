
/* IMPORT */

import {describe} from 'fava';
import isEqual from 'are-deeply-equal';
import {cloneShallow, cloneDeep} from '../dist/index.js';

/* MAIN */

describe ( 'Duper', () => {

  describe ( 'cloneShallow', it => {

    it ( 'supports regular primitives', t => {

      for ( const primitive of [null, undefined, 'foo', 123, true, false, Symbol (), 123n] ) {

        t.true ( isEqual ( cloneShallow ( primitive ), primitive ) );

      }

    });

    it ( 'supports special primitives', t => {

      for ( const primitive of [NaN, Infinity, -Infinity, 0, -0] ) {

        t.true ( isEqual ( cloneShallow ( primitive ), primitive ) );

      }

    });

    it ( 'supports boxed primitives', t => {

      for ( const primitive of [Object ( 'foo' ), Object ( 123 ), Object ( true ), Object ( 123n )] ) {

        t.true ( isEqual ( cloneShallow ( primitive ), primitive ) );

      }

    });

    it ( 'supports arrays', t => {

      const arr = [{}];
      const clone = cloneShallow ( arr );

      t.true ( isEqual ( arr, clone ) );
      t.is ( arr[0], clone[0] );

    });

    it ( 'supports array buffers', t => {

      const buffer = new Uint8Array ([ 1, 2, 3 ]).buffer;
      const clone = cloneShallow ( buffer );

      t.true ( isEqual ( buffer, clone ) );

    });

    it ( 'supports errors', t => {

      for ( const error of [Error ( 'foo' ), EvalError ( 'foo' ), RangeError ( 'foo' ), ReferenceError ( 'foo' ), SyntaxError ( 'foo' ), TypeError ( 'foo' ), URIError ( 'foo' )] ) {

        t.true ( isEqual ( cloneShallow ( error ), error ) );

      }

    });

    it ( 'supports objects', t => {

      const obj = { value: [] };
      const clone = cloneShallow ( obj );

      t.true ( isEqual ( obj, clone ) );
      t.is ( obj.value, clone.value );

    });

    it ( 'supports dates', t => {

      for ( const date of [new Date ( -1 ), new Date ( Infinity ), new Date ()] ) {

        t.true ( isEqual ( cloneShallow ( date ), date ) );

      }

    });

    it ( 'supports maps', t => {

      const map = new Map ([ ['value', {}] ]);
      const clone = cloneShallow ( map );

      t.true ( isEqual ( map, clone ) );
      t.is ( map.get ( 'value' ), clone.get ( 'value' ) );

    });

    it ( 'supports sets', t => {

      const set = new Set ([ {} ]);
      const clone = cloneShallow ( set );

      t.true ( isEqual ( set, clone ) );
      t.is ( Array.from ( set.values () )[0], Array.from ( clone.values () )[0] );

    });

    it ( 'supports regexes', t => {

      for ( const regex of [/foo/, /foo/gi] ) {

        t.true ( isEqual ( cloneShallow ( regex ), regex ) );

      }

    });

    it ( 'supports typed arrays', t => {

      for ( const TypedArray of [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array] ) {

        const arr = new TypedArray ([ 1, 2, 3 ]);
        const clone = cloneShallow ( arr );

        t.true ( isEqual ( arr, clone ) );

      }

      for ( const TypedArray of [BigInt64Array, BigUint64Array] ) {

        const arr = new TypedArray ([ 1n, 2n, 3n ]);
        const clone = cloneShallow ( arr );

        t.true ( isEqual ( arr, clone ) );

      }

    });

    it ( 'supports copying over own symbols', t => {

      const symbol = Symbol ();

      for ( const obj of [{}, [], new Map (), new Set (), new Date (), new RegExp ( 'foo' ), new Error (), new Uint8Array ().buffer, new Uint8Array (), Object ( 123 )] ) {

        obj[symbol] = { value: true };

        t.true ( isEqual ( cloneShallow ( obj ), obj ) );
        t.true ( cloneShallow ( obj )[symbol].value );
        t.is ( cloneShallow ( obj )[symbol], obj[symbol] );

      }

    });

    it ( 'supports circular arrays', t => {

      const circular = [];

      circular[0] = circular;

      const clone = cloneShallow ( circular );

      t.true ( isEqual ( circular, clone ) );
      t.is ( circular[0], clone[0] );

    });

    it ( 'supports circular objects', t => {

      const circular = {};

      circular.circular = circular;

      const clone = cloneShallow ( circular );

      t.true ( isEqual ( circular, clone ) );
      t.is ( clone.circular, clone.circular );

    });

    it ( 'supports circular maps', t => {

      const circular = new Map ();

      circular.set ( circular, circular );

      const clone = cloneShallow ( circular );

      t.true ( isEqual ( circular, clone ) );
      t.is ( Array.from ( circular.keys () )[0], Array.from ( clone.keys () )[0] );
      t.is ( Array.from ( circular.values () )[0], Array.from ( clone.values () )[0] );

    });

    it ( 'supports circular sets', t => {

      const circular = new Set ();

      circular.add ( circular );

      const clone = cloneShallow ( circular );

      t.true ( isEqual ( circular, clone ) );
      t.is ( Array.from ( circular.values () )[0], Array.from ( clone.values () )[0] );

    });

    it ( 'throws for weakmaps', t => {

      try {

        cloneShallow ( new WeakMap () );

      } catch ( error ) {

        t.is ( error.message, 'Value can not be cloned' );

      }

    });

    it ( 'throws for weaksets', t => {

      try {

        cloneShallow ( new WeakSet () );

      } catch ( error ) {

        t.is ( error.message, 'Value can not be cloned' );

      }

    });

    it ( 'throws for custom classes', t => {

      try {

        cloneShallow ( new (class Foo {}) () );

      } catch ( error ) {

        t.is ( error.message, 'Value can not be cloned' );

      }

    });

  });

  describe ( 'cloneDeep', it => {

    it ( 'supports regular primitives', t => {

      for ( const primitive of [null, undefined, 'foo', 123, true, false, Symbol (), 123n] ) {

        t.true ( isEqual ( cloneDeep ( primitive ), primitive ) );

      }

    });

    it ( 'supports special primitives', t => {

      for ( const primitive of [NaN, Infinity, -Infinity, 0, -0] ) {

        t.true ( isEqual ( cloneDeep ( primitive ), primitive ) );

      }

    });

    it ( 'supports boxed primitives', t => {

      for ( const primitive of [Object ( 'foo' ), Object ( 123 ), Object ( true ), Object ( 123n )] ) {

        t.true ( isEqual ( cloneDeep ( primitive ), primitive ) );

      }

    });

    it ( 'supports arrays', t => {

      const arr = [{}];
      const clone = cloneDeep ( arr );

      t.true ( isEqual ( arr, clone ) );
      t.not ( arr[0], clone[0] );

    });

    it ( 'supports array buffers', t => {

      const buffer = new Uint8Array ([ 1, 2, 3 ]).buffer;
      const clone = cloneDeep ( buffer );

      t.true ( isEqual ( buffer, clone ) );

    });

    it ( 'supports errors', t => {

      for ( const error of [Error ( 'foo' ), EvalError ( 'foo' ), RangeError ( 'foo' ), ReferenceError ( 'foo' ), SyntaxError ( 'foo' ), TypeError ( 'foo' ), URIError ( 'foo' )] ) {

        t.true ( isEqual ( cloneDeep ( error ), error ) );

      }

    });

    it ( 'supports objects', t => {

      const obj = { value: [] };
      const clone = cloneDeep ( obj );

      t.true ( isEqual ( obj, clone ) );
      t.not ( obj.value, clone.value );

    });

    it ( 'supports dates', t => {

      for ( const date of [new Date ( -1 ), new Date ( Infinity ), new Date ()] ) {

        t.true ( isEqual ( cloneDeep ( date ), date ) );

      }

    });

    it ( 'supports maps', t => {

      const map = new Map ([ ['value', {}] ]);
      const clone = cloneDeep ( map );

      t.true ( isEqual ( map, clone ) );
      t.not ( map.get ( 'value' ), clone.get ( 'value' ) );

    });

    it ( 'supports sets', t => {

      const set = new Set ([ {} ]);
      const clone = cloneDeep ( set );

      t.true ( isEqual ( set, clone ) );
      t.not ( Array.from ( set.values () )[0], Array.from ( clone.values () )[0] );

    });

    it ( 'supports regexes', t => {

      for ( const regex of [/foo/, /foo/gi] ) {

        t.true ( isEqual ( cloneDeep ( regex ), regex ) );

      }

    });

    it ( 'supports typed arrays', t => {

      for ( const TypedArray of [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array] ) {

        const arr = new TypedArray ([ 1, 2, 3 ]);
        const clone = cloneDeep ( arr );

        t.true ( isEqual ( arr, clone ) );

      }

      for ( const TypedArray of [BigInt64Array, BigUint64Array] ) {

        const arr = new TypedArray ([ 1n, 2n, 3n ]);
        const clone = cloneDeep ( arr );

        t.true ( isEqual ( arr, clone ) );

      }

    });

    it ( 'supports copying over own symbols', t => {

      const symbol = Symbol ();

      for ( const obj of [{}, [], new Map (), new Set (), new Date (), new RegExp ( 'foo' ), new Error (), new Uint8Array ().buffer, new Uint8Array (), Object ( 123 )] ) {

        obj[symbol] = { value: true };

        t.true ( isEqual ( cloneDeep ( obj ), obj ) );
        t.true ( cloneDeep ( obj )[symbol].value );
        t.not ( cloneDeep ( obj )[symbol], obj[symbol] );

      }

    });

    it ( 'supports circular arrays', t => {

      const circular = [];

      circular[0] = circular;

      const clone = cloneDeep ( circular );

      t.true ( isEqual ( circular, clone ) );
      t.not ( circular[0], clone[0] );

    });

    it ( 'supports circular objects', t => {

      const circular = {};

      circular.circular = circular;

      const clone = cloneDeep ( circular );

      t.true ( isEqual ( circular, clone ) );
      t.not ( circular.circular, clone.circular );

    });

    it ( 'supports circular maps', t => {

      const circular = new Map ();

      circular.set ( circular, circular );

      const clone = cloneDeep ( circular );

      t.true ( isEqual ( circular, clone ) );
      t.not ( Array.from ( circular.keys () )[0], Array.from ( clone.keys () )[0] );
      t.not ( Array.from ( circular.values () )[0], Array.from ( clone.values () )[0] );

    });

    it ( 'supports circular sets', t => {

      const circular = new Set ();

      circular.add ( circular );

      const clone = cloneDeep ( circular );

      t.true ( isEqual ( circular, clone ) );
      t.not ( Array.from ( circular.values () )[0], Array.from ( clone.values () )[0] );

    });

    it ( 'throws for weakmaps', t => {

      try {

        cloneDeep ( new WeakMap () );

      } catch ( error ) {

        t.is ( error.message, 'Value can not be cloned' );

      }

    });

    it ( 'throws for weaksets', t => {

      try {

        cloneDeep ( new WeakSet () );

      } catch ( error ) {

        t.is ( error.message, 'Value can not be cloned' );

      }

    });

    it ( 'throws for custom classes', t => {

      try {

        cloneDeep ( new (class Foo {}) () );

      } catch ( error ) {

        t.is ( error.message, 'Value can not be cloned' );

      }

    });

  });

});
