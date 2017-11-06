const minify = require('html-minifier').minify;
const fs = require('fs');



fs.readFile('index.html', 'utf8', (err, html) => {  
  if (err) throw err;
  const result = minify(html, {
    removeAttributeQuotes: true
  });

  fs.writeFile('build/index.html', result, 'utf8', () => {
    console.log('Done');
  });
});