'use strict'
var phantom = require('phantom')
var cheerio = require('cheerio')
var request = require('request')
var instance, _page
const username = "106030029";
const password = "83891111";
const courseList = [];

const pr = 
   phantom
  .create()
  .then(ph => {
    instance = ph
    return instance.createPage()
  })
  .then(page => {
    _page = page
    _page.setting('userAgent', "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36")
    _page.on('onConsoleMessage', true, function(msg) {
      console.log('msg: ' + msg)
    })
    return _page.open('https://elearn.nthu.edu.tw/login/index.php')
  })
  .then(status => {
    return new Promise(function (resolve, reject) {
      _page.on('onAlert', function (msg) {
        reject(msg)
      })
      _page.on('onLoadFinished', function (status) {
        //console.log("Status: ' + status);
        resolve(status)
      })
      
      _page.evaluate(function (name,pass) {
        
        document.querySelector("input[name='username']").value = name
        document.querySelector("input[name='password']").value = pass
        document.querySelector("button[class='btn-login']").click()
        // document.querySelector("input[id='loginbtn']").click()

        //console.log("Submitted!")
      },username,password)
    })
  })
  .then(()=> {
    //console.log("log success!")
    //_page.render('eLearn.png')
    return _page.property('content')
  })
  .then((content) => {
    var $ = cheerio.load(content)
    //console.log(content)
    /* Get Course Name*/ //$('.course-info-container > .media > .media-body > .media-heading > a ')
    $('div[id="courses-view-in-progress"]').find('div > div > div > div > div >div >div > h4 > a').each(function(i, elem) {
      
        let ID = $(elem).attr('href').match("\\d+")[0];
        courseList.push({"name": $(elem).text(), "id": ID});
      
        
    });
    courseList.map( name => { console.log(name)})

    const off = _page.off('onLoadFinished');
    return Promise.all([off])
    }
  )
  .then(()=> {
    instance.exit()
  })
  .catch(e => {
    console.log("Failed! " + e)
    const off = _page.off('onLoadFinished');
    return Promise.all([off]).then(()=>{
      instance.exit()
    })
  });
 
  Promise.all([pr]).then(()=>{
  	console.log("Finish");
  })

  
async function getResult() {
  await pr;
  return {
    Course: [...courseList]
  }
}


module.exports = {
  getResult
}