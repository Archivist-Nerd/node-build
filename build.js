'use strict';
/**
 * @api             build
 * @api:npm         @archivist/build
 * @api:git         https://github.com/Archivist-Nerd/node-build
 * @api:Licence     MIT
 * @api:Copyright   Copyright (c) 2020 Archivist-Nerd
 */
const fs   = require('fs')
    , path = require('path')
    ;
function removeComments( source='', lines = source.split('\n') ){
  let comments = []
    , text     = []
    ;
  while (lines.length){
    if (lines[0].trim().substr(0,2)=='/*'){                 // comment starts
      let comment = []
      while (lines.length && lines[0].trim().substr(0,2)!='*/')
        comment.push( lines.shift() );
      comment.push( lines.shift() );
      comments.push( comment )
    } else {
      text.push( lines.shift() )
    }
  }
  if (comments.length) text.splice(1,0,comments[0].join('\n'))
  return text.join('\n')
}
function build( buildFilename ){
  if  (     !buildFilename
        ||  !fs.existsSync( buildFilename )
      ) return false;

  let getPath = filename => filename.match(/(.+[/:\\])/)[1]
    , text    = ''
    //  set srcPath to path of buildfile
    , srcPath = getPath( path.resolve( buildFilename ) )
    //  load buildfile data
    , lines   = fs.readFileSync( buildFilename, 'utf8').split('\n')
    ;

  // process every line of buildfile
  lines.forEach( line => {
    line=line.trim()
    if (line=='' || line[0]=='#') return ;
    switch ( line.substr(0,2) ){
      case '--':                          // output blank line
        console.log('')
        break;
      case '>>':                          // write file
        line = line.substr(2).trim()
        console.log(`writing ${line} \t ${text.length} bytes`)
        fs.writeFileSync( line, text )
        text='';
        break;
      case '!S':
        let size   = text.length
          , shrunk = removeComments(text)
          , saved  = size - shrunk.length
          , percent = ((saved/size)*100).toFixed(2)
          ;
        text = shrunk
        console.log(`!shrink  \t\t* saved ${percent}% (${saved} bytes)  *`)
        break;
      case '<<':                          // readfile data
        line = line.substr(2).trim()
      default:                            // readfile data
        if (fs.existsSync( srcPath+line) ){
          let data = fs.readFileSync( srcPath+line, 'utf8' )
            ;
          console.log(`reading ${line} \t ${data.length} bytes`)
          text += data
          if (text[text.length-1] != '\n') text += '\n'
        } else {
          console.log(`error: file does not exist "${line}"`)
        }
    }
  })

  return true
}
module.exports = {
  build,
  removeComments,
};
