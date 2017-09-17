import * as path from 'path'

const themePath = '../themes/'

/**
 * This module contains some magic strings and other configuration values
 */
export default {
  themePath: path.resolve(__dirname, themePath),
  defaultTheme: path.resolve(__dirname, themePath, 'default/index.html'),
}
