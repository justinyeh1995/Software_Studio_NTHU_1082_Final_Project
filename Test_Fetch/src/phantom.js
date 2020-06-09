// import * as phantom from 'phantom';
var phantom = require('phantomjs');
var instance, _page
const username = "<username>";
const password = "<userpassword>";
function ph() {
    console.log("!");
const pr = 
   phantom
  .create()
  .then(ph => {
    instance = ph
    return instance.createPage()
  })
  .then(
    page => {
    _page = page
    _page.setting('userAgent', "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36")
    console.log("!")
    _page.on('onConsoleMessage', true, function(msg) {
    console.log('msg: ' + msg)
    })
    console.log("!")
    return _page.open('http://webpac.library.ntpu.edu.tw/Webpac2/Person.dll/')
    }
 );
}
module.exports = {
    ph
}