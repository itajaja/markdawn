let fs = require('fs');
let program = require('commander');

let markdawn = require('./core').markdawn;
let utils = require('./utils');

// create the program object to parse options
program
  .usage('[options] <file>')
  .option('-o, --out <out>', 'name of output file')
  .parse(process.argv);

// read the input
let inputFile = program.args[0] || 'input.md';
let input = fs.readFileSync(inputFile, 'utf8');

let output = program.out || utils.changeExtension(inputFile, 'pdf');

// call markdawn to generate the pdf
// TODO remember to remove the write of the html (only for debugging purposes)
fs.writeFileSync('out.html', markdawn.generate(input, output));

