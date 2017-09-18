import * as fs from 'fs'
import * as hljs from 'highlight.js'
import * as toc from 'markdown-toc'
import * as os from 'os'
import * as path from 'path'
import * as puppeteer from 'puppeteer'
import * as Remarkable from 'remarkable'

import config from './config'
import * as utils from './utils'

const md = new Remarkable('full', {
  linkify: true,
  typographer: true,
  html: true,
  quotes: '“”‘’',
  _strict: false,
  highlight(str, lang) {

    function logErr() {
      console.warn(`highlighting failed for the following snippet ${str}`)
    }

    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (err) {
        logErr()
      }
    }

    try {
      return hljs.highlightAuto(str).value
    } catch (err) {
      logErr()
    }

    return '' // use external default escaping
  },
})

function generateIndex(index) {
  const indexText = fs.readFileSync(index, 'utf8')
  return `<!DOCTYPE html>
${indexText}`
}

// parse the multimarkdown-style metadata
function parseMetadata(text) {
  const lines = text.split('\n')
  const metadata = {}
  let count = 0

  for (const line of lines) {
    if (!line || line.indexOf(':') === -1) {
      break
    }
    ++count
    const index = line.indexOf(':')
    const key = line.substr(0, index)
    const val = line.substr(index + 1)
    metadata[key] = val
  }

  return {
    count,
    metadata,
  }
}

function stripMetadata(text, count) {
  const lines = text.split('\n')
  lines.splice(0, count)
  return lines.join('\n')
}

function addToc(text, html) {
  const tocObj = {
    TOC: md.render(toc(text).content),
  }
  return utils.interpolate(html, tocObj)
}

/**
 * make the `href` and `src` attributes in an html text point to the provided folder
 */
function absolutePaths(html, indexPath) {
  html = utils.rebaseAttribute(html, indexPath, 'href')
  html = utils.rebaseAttribute(html, indexPath, 'src')
  return html
}

/**
 * generate the pdf document with the following input
 * @param text the markdwon text to insert in the docuement
 * @param opts object containing configuration keys for generating the pdf
 *   - index: path to the index.html file that defines a theme
 *   - format: (e.g. "Letter", "A4") overrides the format specified in the theme
 *   - out: name of output file
 *   - theme: name of a preconfigured theme to use (it has priority over the `index` property)
 *   - contentDir: content directory to take the content source from
 * @return the html that generates the pdf, useful for debugging purposes
 */
export async function generate(text, opts) {

  // sanitize input
  opts = opts || {}
  if (!text) {
    console.warn('the input text is empty')
  }
  const out = opts.out || 'out.pdf'
  opts.contentDir = opts.contentDir || './'

  let index = opts.index
  if (opts.theme) {
    // select the theme
    index = path.resolve(config.themePath, opts.theme, 'index.html')
  }

  // validate that the index file exists
  if (!index || !fs.existsSync(index)) {
    console.warn(
      `Warning: the index file provided (${index}) doesn't exist.` +
      ` Markdawn will use the default theme`,
    )
    index = config.defaultTheme
  }

  const indexPath = path.dirname(path.resolve(index))
  let html = generateIndex(index)

  // process metedata
  const { count, metadata } = parseMetadata(text)
  text = stripMetadata(text, count)
  html = utils.interpolate(html, metadata)

  // add TOC
  html = addToc(text, html)

  html = absolutePaths(html, indexPath)

  let markdown = md.render(text)
  markdown = absolutePaths(markdown, opts.contentDir)

  // insert markdown into index html
  html = utils.interpolate(html, {
    content: markdown,
  })

  let pdfOptions: any = {}
  try {
    pdfOptions = require(path.resolve(indexPath, 'page.json'))
  } catch (e) {
    console.warn(
      `Warning: missing file page.json in the index folder (${index}).` +
      ` Using default page settings`,
    )
  }

  if (opts.format) {
    // overwrite the format
    pdfOptions.format = opts.format
  }

  let filePath
  do {
    filePath = path.join(os.tmpdir(), `markdawn-tmp-${Math.random()}.html`)
  } while (fs.existsSync(filePath))

  fs.writeFileSync(filePath, html)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`file://${filePath}`)
  await page.pdf({ ...pdfOptions, path: out })
  await browser.close()

  return html
}

/**
 * get the list of preconfigured thems that can be used
 * @return a list of strings, each string representing a name of a theme
 */
export function getThemes() {
  return fs.readdirSync(config.themePath).filter(f => f[0] !== '_')
}
