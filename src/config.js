let path = require('path');

let themePath = '../themes/';

let config = {
  themePath: path.resolve(__dirname, themePath),
  defaultTheme: path.resolve(__dirname, themePath, 'default/index.html')
};

/**
 * This module contains some magic strings and other
 * configuration values
 */
module.exports = config;
