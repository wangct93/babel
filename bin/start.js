#!/usr/bin/env node

const babel = require('../lib');
const [src,output] = process.argv.slice(2);

babel({
  src,
  output,
});
