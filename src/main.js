var fs = require('fs');
var program = require('commander');

var markdawn = require('./core').markdawn;

// create the program object to parse options
program
  .usage('[options] <file>')
  .parse(process.argv);

// parse the input
var inputFile = program.args[0] || 'input.md';
var inputText = fs.readFileSync(inputFile, 'utf8');

console.log(markdawn.generate(inputText));
