#!/usr/bin/env node
/**
 * @app             build
 * @app:npm         @archivist/build
 * @app:git         https://github.com/Archivist-Nerd/node-build
 * @app:Licence     MIT
 * @app:Copyright   Copyright (c) 2020 Archivist-Nerd
 *
 * @app:Example:
 *      build [buildFile]
 *
 * @app:Example:
 *      build ./src/.build
 */
'use strict';

const pkg = require('./package.json')         //  package.json Contents
  , bargs = require("@archivistnerd/bargs")   //  Command Line Arguments
  , app   = require('../.')                   //  actual app code
  ;
process.on('uncaughtException',  err => console.error('uncaughtException', err))
process.on('unhandledRejection', err => console.error('unhandledRejection', err))
bargs
  .scriptName( `${ pkg.name } \t ${ 'v'+pkg.version } \t ${ pkg.description }` )
  .usage(`build [buildfile]`)

  .command('$ [buildfile]', 'use buildfile',
    (argv) => {
      if ( argv.buildFile == undefined ) return bargs.displayHelp()
      if (!app.build( argv.buildFile )) console.log(`  error: file "${argv.buildFile}" does not exist`)
    }
   ,[
      { name: 'buildFile', type: 'string',                       describe: 'build filename' },
    ])

  .help()
  .argv;
