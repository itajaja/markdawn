var Remarkable = require('remarkable');
var md = new Remarkable();

console.log(md.render('# Remarkable rulezz!'));
// => <h1>Remarkable rulezz!</h1>
