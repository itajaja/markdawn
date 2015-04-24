module.exports = {

  /**
   * Interpolate object values into the input using double curly braces interpolation
   */
  interpolate: (input, object) => {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        var exp = new RegExp(`{{${key}}}`, 'g');
        input = input.replace(exp, object[key]);
      }
    }
    return input;
  },

  /**
   * Change extension of a file
   */
  changeExtension: (fileName, extension) => {
    var to = fileName.lastIndexOf('.');

    if (to < 0) {
      to = fileName.length;
    }

    var name = fileName.substr(0, to);
    return `${name}.${extension}`;
  }
};
