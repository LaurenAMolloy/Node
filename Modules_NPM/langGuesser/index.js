const franc = require('franc');
const langs = require('langs');
//process is a node.js object
//argv means argument values
// [
//   'node',          // index 0
//   '/path/app.js',  // index 1
//    input,         // index 2
// ]

const input = process.argv[2].toLowerCase().trim();
const langCode = franc(input);

if(langCode === 'und') {
    console.log("SORRY COULDN'T FIGURE IT OUT! TRY WITH MORE SAMPLE TEXT")
}

const langauge = langs.where("3", langCode);
console.log(`Our best guess is ${langauge.name}`)