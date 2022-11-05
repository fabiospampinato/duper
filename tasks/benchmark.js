
/* IMPORT */

import benchmark from 'benchloop';
import fs from 'node:fs';
import path from 'node:path';
import {cloneShallow, cloneDeep} from '../dist/index.js';

/* HELPERS */

const fixturePath = path.join ( process.cwd (), 'tasks', 'benchmark.fixture.json' );
const fixtureContent = fs.readFileSync ( fixturePath, 'utf8' );
const fixture = JSON.parse ( fixtureContent );

/* MAIN */

benchmark.defaultOptions = Object.assign ( benchmark.defaultOptions, {
  iterations: 10_000,
  log: 'compact'
});

benchmark ({
  name: 'cloneShallow',
  fn: () => {
    cloneShallow ( fixture );
  }
});

benchmark ({
  name: 'cloneDeep',
  fn: () => {
    cloneDeep ( fixture );
  }
});

benchmark ({
  name: 'structuredClone',
  fn: () => {
    structuredClone ( fixture );
  }
});

benchmark.summary ();
