import * as cheerio from 'cheerio'
import * as path from 'path'

/**
 * Interpolate object values into the input using double curly braces interpolation
 */
export function interpolate(input, object) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const exp = new RegExp(`{{${key}}}`, 'g')
      input = input.replace(exp, object[key])
    }
  }
  return input
}

/**
 * rebase all the html attributes to a specified base path
 */
export function rebaseAttribute(html, basePath, attr) {
  const $ = cheerio.load(html)
  $(`*[${attr}]`)
    .filter((key, val) => {
      const firstChar = val.attribs[attr][0]
      return firstChar === '.' || firstChar === '.'
    })
    .attr(attr, (_, val) => {
      // rebase the attribute
      const absPath = path.resolve(basePath, val)
      // make sure it's a valid URI.
      return `file://${absPath}`
    })
  return $.html()
}
