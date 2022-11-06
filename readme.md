# Duper

Standalone functions for creating shallow clones or deep clones.

It supports cloning primitives, `Array`, `Map`, `Set`, `Date`, `RegExp`, `ArrayBuffer`, `DataView`, `Int8Array`, `Uint8Array`, `Uint8ClampedArray`, `Int16Array`, `Uint16Array`, `Int32Array`, `Uint32Array`, `Float32Array`, `Float64Array`, `BigInt64Array`, `BigUint64Array`, `Error`, `EvalError`, `RangeError`, `ReferenceError`, `SyntaxError`, `TypeError`, `URIError`, and plain objects, trying to clone anything else will throw.

## Install

```sh
npm install --save duper
```

## Usage

```ts
import {cloneShallow, cloneDeep} from 'duper';

cloneShallow ({ foo: { value: 123 } }); // => Shallow clone of the object
cloneDeep ({ foo: { value: 123 } }); // => Deep clone of the object
```

## License

MIT © Fabio Spampinato
