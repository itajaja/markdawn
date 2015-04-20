var fs = require('fs');
var program = require('commander');

var markdawn = require('./core').markdawn;

// create the program object to parse options
program
  .usage('[options] <file>')
  .option('-o, --out <out>', 'name of output file')
  .option('-s, --style <style.css>', 'name of output file')
  .parse(process.argv);

// read the input
var inputFile = program.args[0] || 'input.md';
var input = fs.readFileSync(inputFile, 'utf8');

// read the css file
var cssFile = program.style || 'style.css';
var css = fs.readFileSync(cssFile, 'utf8');

var output = program.out || changeExtension(inputFile, 'pdf');

// call markdawn to generate the pdf
markdawn.generate(input, output, css);

// utility functions

function changeExtension (fileName, extension){
  var to = fileName.lastIndexOf(".");

  if(to < 0)
    to = fileName.length;

  var name = fileName.substr(0, to);
  return `${name}.${extension}`;
}
