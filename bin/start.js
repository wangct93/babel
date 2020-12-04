#!/usr/bin/env node

const babel = require('../index');
const [src,output] = process.argv.slice(2);

babel({
  src,
  output,
});
