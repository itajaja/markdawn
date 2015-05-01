#! /usr/bin/env node

(function () {
  let fs = require('fs');
  let program = require('commander');
  let path = require('path');

  let markdawn = require('./core');
  let utils = require('./utils');

  // create the program object to parse options
  program
    .usage('[options] <file>')
    .version(require('../package.json').version)
    .option('-o, --out <out>', 'name of output file')
    .option('-t, --theme <theme>', 'name of a preconfigured theme to use')
    .option('-i, --index <index.html>', 'path to the index.html file that defines a theme')
    .option('-f, --format <format>', '(e.g. "Letter", "A4") overrides the format specified in the theme')
    .option('--themes', 'shows the list of preconfigured themes')
    .parse(process.argv);

  // sanitize input
  if (program.theme && program.index) {
    console.error('\nYou cannot specify an index file and a theme at the same time\n');
    return -1;
  }

  if (program.themes || program.theme && markdawn.getThemes().indexOf(program.theme) === -1) {
    console.log('\nAvailable themes: ');
    markdawn.getThemes().forEach((theme) => {
      console.log(`    ${theme}`);
    });
    console.log(); // empty line
    // returns 0 if you are showing the themes, else -1 in the case there was an error selecting themes
    return program.themes ? 0 : -1;
  }
  // read the input
  let inputFile = program.args[0] || 'input.md';
  let input = fs.readFileSync(inputFile, 'utf8');

  let output = program.out || utils.changeExtension(inputFile, 'pdf');


  // build options file
  let opts = {
    index: program.index,
    format: program.format,
    out: output,
    theme: program.theme,
    contentDir: path.dirname(inputFile)
  };

  // call markdawn to generate the pdf
  markdawn.generate(input, opts);
  // for debugging purposes, you can substitute the line above with
  // the following line to write an html file
  // fs.writeFileSync('out.html', markdawn.generate(input, opts));
}());
