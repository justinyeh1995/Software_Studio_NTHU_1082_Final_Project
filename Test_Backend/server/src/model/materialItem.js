/* Goal: Sign in to iLMS, eLearn, Moodle*/
'use strict'
var phantom = require('phantom')
var cheerio = require('cheerio')
var request = require('request')
var axios = require('axios')
var instance, _page
const username = "1073007S";
const password = "21960402";
const materialList = [];
const title = [];
const video = [];
const attachment = [];
const materialItemPack = [];

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
    return _page.open('https://lms.nthu.edu.tw/login_page.php?ssl=1&from=%2Fhome.php')
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

        document.querySelector("input[id='loginAccount']").value = name
        document.querySelector("input[type='password']").value = pass

        document.querySelector("input[onClick='m_loginSubmit()']").click()

        console.log("Submitted!")
      },username,password)
    })
  })
  .then(()=> {
    //console.log("log success!")
    //_page.render('Home3.png')

  })
  .then(()=>{
    return _page.open('https://lms.nthu.edu.tw/course.php?courseID=43470&f=doc&cid=2469658')
  })
  .then(status => {
      _page.render('materialList.png')
  })
  .then(()=> {
    return _page.property('content')
  })
  .then((content)=> {
       
        var $ = cheerio.load(content)

        $('.doc > .title').each( function(i, elem) { 
            title.push($(this).text());
        })

        $('.article > div > div > video').each( function(i, elem) { 
          video.push('https://lms.nthu.edu.tw'+$(this).attr("src"));
        })

        $('.attach > .block > div > :nth-child(2)').each( function(i, elem) { 
            var attachlink = 'https://lms.nthu.edu.tw'+$(this).attr("href");
            var title = $(this).attr("title")
            attachment.push({"title": title, "link": attachlink})
          })

        materialItemPack[0] = {"title": title, "video": video, "attachment": attachment};
        console.log(materialItemPack[0])
  })
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


async function getHomeworkItem() {
  await pr;
  return {
    Homework: [...homeworkPack]
  }
}

module.exports = {
  getHomeworkItem
}
