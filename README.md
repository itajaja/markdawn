# markdawn

> markdown for paged documents. Outputs to pdf

[![NPM](https://nodei.co/npm/markdawn.png?downloads=true)](https://nodei.co/npm/markdawn/)

## Usage

Markdawn generates pdfs from markdown documents and HTML+CSS templates using [remarkable](https://github.com/jonschlinkert/remarkable) markdown generator and [node-html-pdf](https://github.com/marcbachmann/node-html-pdf) pdf generator behind the scenes.

### As command line tool

You can call markdawn from command line. To install:

````bash
$ npm install -g markdawn
````

type `markdawn -h` to show a list of options.

### As library

you can use markdawn in your node app as well:

````js
var md = require('markdawn');

var options = {};

md.generate('This _is_ my **input**!', options);
````

the `options` object can contain the following properties:

- `index`: path to the index.html file that defines a theme
- `format`: (e.g. "Letter", "A4") overrides the format specified in the theme
- `out`: name of output file
- `theme`: name of a preconfigured theme to use (this property has priority over the `index` property)
- `contentDir`: content directory to take the content source from

### As grunt task

Visit https://github.com/itajaja/grunt-markdawn/ for more informations

## Creating your theme

A theme needs at least two objects (in the same folder). The `index.html` defines the layout of the document. The `page.json` declares some values to use for the pdf generation (e.g: format).

You can look at the [preconfigured themes](https://github.com/itajaja/markdawn/tree/master/themes) to get an idea on how to build a theme of your own!

You can also use a preconfigured theme right away! type `markdawn --themes` to see the list of available themes and then use the `-t` option to use one of these themes.

### Headers + Footers

you can define two divs in your `index.html` for the header and the footer. Mark them with the `pageHeader` and `pageFooter` ids respectively and markdawn will put the two divs in the header and footer areas of the document.

## using metadata

You can declare multi-markdown style metadata at the top of your markdown file. The metadata will be stripped down, and the values will be injected in the generated file. For example, if your markdown file starts like that:

````md
Title: How to fart silently
Author: Giacomo Tagliabe
````

and the index.html looks like that:

````html
<div class="title-page">
  <div>{{Title}}</div>
  <div>{{Author}}</div>
</div>
````

The generated pdf will show the injected values in the title page. Have a look at the [preconfigured themes](https://github.com/itajaja/markdawn/tree/master/themes) for additional examples.

## TODO

- [x] a folder that contains all the static elements. (defaults to running folder?)
- [x] title page
- [ ] breakpages
- [x] header + footer
- [x] margins (maybe inside metadata?)
- [x] metadata (title, author, whatever... multimarkdown style)
- [ ] themed sections
- [ ] multi column (hardly doable :/)
- [x] pdf options
- [x] theme selector
- [ ] add eslint to gulp
- [ ] @page media type
- [ ] math functions
- [ ] fix link and references
