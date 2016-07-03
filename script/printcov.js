#!/usr/bin/env node

var fs = require('fs');
var consoler = require('consoler');
consoler.add('warning: uncovered code', 'yellow');

if(process.argv.length < 3){
  console.log('printcov lcov-file [source-src]');
  process.exit(0);
}

var lcov = process.argv[2];
var source = process.argv[3];

function print(){
  var content = fs.readFileSync(lcov, 'utf-8');

  console.log('Generated test coverages:\n');

  var total = 0, total_covered = 0;

  if(content){
    var lines = content.split(/\n/g);

    var file = null, covered = 0, statements = 0, 
        sourceMap = null, linesNotCovered = [];

    lines.forEach((line) => {
      var fileBegin = /^SF:(.+)$/.exec(line),
          fileEnd = /^end_of_record$/.exec(line),
          lineCover = /^DA:(\d+),(\d+)/.exec(line);

      if(fileBegin){
        file = fileBegin[1];
        if(source){
          var sourceFile = require('path').join(source, file);
          sourceMap = fs.readFileSync(sourceFile, 'utf-8');
          sourceMap = sourceMap.split(/\n/g);
        }
      } else if(fileEnd){
        console.log(`${file}: ${Math.floor(100 * covered/statements)}%`);

        if(linesNotCovered.length){
          consoler('warning: uncovered code', linesNotCovered.map((l) => `\tline ${l}: ${sourceMap[l-1]}`).join('\n').red);
        }
        
        total += statements;
        total_covered += covered;

        file = null;
        covered = 0;
        statements = 0;
        sourceMap = null;
        linesNotCovered = [];
      } else if(lineCover){
        var n = lineCover[2]|0;
        var l = lineCover[1]|0;

        if(n > 0){
          covered++;
        }else{
          if(sourceMap){
            linesNotCovered.push(l);
          }
        }
        statements++;
      }
    });
  }
  console.log(`\ntotal:${Math.floor(100 * total_covered/total)}%\n`);
}

print();
