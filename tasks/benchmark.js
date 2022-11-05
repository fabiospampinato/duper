
/* IMPORT */

import benchmark from 'benchloop';
import clona from '../dist/index.js';

/* MAIN */

benchmark.defaultOptions = Object.assign ( benchmark.defaultOptions, {
  iterations: 100,
  log: 'compact'
});

benchmark ({
  name: 'clona',
  fn: () => {
    //TODO
  }
});

benchmark.summary ();
