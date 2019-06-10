#!/usr/bin/env node
require('yargs')
  .commandDir('lib')
  .demandCommand(1)
  .help()
  .parse()
