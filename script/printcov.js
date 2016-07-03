#!/usr/bin/env node

var fs = require('fs');

function print(){
  var content = fs.readFileSync('app/coverage.lcov', 'utf-8');

  console.log('Generated test coverages:\n');

  var total = 0, total_covered = 0;

  if(content){
    var lines = content.split(/\n/g);

    var file = null, covered = 0, statements = 0;

    lines.forEach((line) => {
      var fileBegin = /^SF:(.+)$/.exec(line),
          fileEnd = /^end_of_record$/.exec(line),
          lineCover = /^DA:(\d+),(\d+)/.exec(line);

      if(fileBegin){
        file = fileBegin[1];
      } else if(fileEnd){
        console.log(`${file}: ${Math.floor(100 * covered/statements)}%`)
        
        total += statements;
        total_covered += covered;

        file = null;
        covered = 0;
        statements = 0;
      } else if(lineCover){
        var n = lineCover[2]|0;
        if(n > 0){
          covered++;
        }
        statements++;
      }
    });
  }
  console.log(`\ntotal:${Math.floor(100 * total_covered/total)}%`);
}

print();
