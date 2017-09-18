#! /usr/bin/env node

import * as commander from 'commander'
import * as fs from 'fs'
import * as path from 'path'

import * as markdawn from './core'

async function cli() {
  commander
    .usage('[options] <file>')
    .version(require('../package.json').version)
    .option('-o, --out <out>', 'name of output file (default out.pdf)')
    .option('-t, --theme <theme>', 'name of a preconfigured theme to use')
    .option('-i, --index <index.html>', 'path to the index.html file that defines a theme')
    // tslint:disable-next-line:max-line-length
    .option('-f, --format <format>', '(e.g. "Letter", "A4") overrides the format specified in the theme')
    .option('-d, --debug', 'output the intermediate html to "out.html" for debugging purposes')
    .option('--themes', 'shows the list of preconfigured themes')
    .parse(process.argv)

  const { args, format, debug, theme, index, out = 'out.pdf', themes } = commander

  if (theme && index) {
    console.error('\nYou cannot specify an index file and a theme at the same time\n')
    process.exit(-1)
  }

  if (themes || theme && markdawn.getThemes().indexOf(theme) === -1) {
    console.log('\n')
    if (theme) {
      console.log(`Theme "${theme}" not found.`)
    }
    console.log(`Available themes:`)
    markdawn.getThemes().forEach(t => console.log(`    ${t}`))
    console.log() // empty line
    // returns 0 if you are showing the themes, else -1 in case there was an error selecting themes
    process.exit(themes ? 0 : -1)
  }
  // read the input
  const inputFile = args[0]
  const input = fs.readFileSync(inputFile, 'utf8')

  // build options file
  const opts = {
    index,
    format,
    out,
    theme,
    contentDir: path.dirname(inputFile),
  }

  // call markdawn to generate the pdf
  const output = await markdawn.generate(input, opts)
  if (debug) {
    fs.writeFileSync('out.html', output)
  }

}

cli()
