/* Goal: Sign in to iLMS, eLearn, Moodle*/
'use strict'
var phantom = require('phantom')
var cheerio = require('cheerio')
var request = require('request')
var axios = require('axios')
var instance, _page
var instance_course, _page_course
const username = "106030029";
const password = "83891111";
const url = "https://elearn.nthu.edu.tw/mod/forum/discuss.php?d=1369"

//var announceURL;
const announcementlist = [];
const title = [];
const announcePack = [];

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
    return _page.open(url)
  })
  .then(status => {
      _page.render('AnnounceItem.png')
  })
  .then(()=> {
    return _page.property('content')
  })
  .then((content) => {
    var $ = cheerio.load(content)
    /* Get Course Announcement*/
    var title = $('.subject').text();
    var article =$('.no-overflow > .content > div > p').text();
    //var attach = [];
    announcePack.push({
        title: title,
        Announcement: article,
        attach: [],
      })
    console.log(announcePack)
    return announcePack;  
    }
  )
  .then(()=> {
    const off = _page.off('onLoadFinished');
    return Promise.all([off])
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
    console.log("Login Finish");
  })


async function getAnnounceItem() {
  await pr;
  return {
    Announcement: [...announcePack]
  }
}

module.exports = {
    getAnnounceItem
}
