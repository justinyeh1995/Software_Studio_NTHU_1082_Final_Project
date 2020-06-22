/* Goal: Sign in to iLMS, eLearn, Moodle*/
'use strict'
var phantom = require('phantom')
var cheerio = require('cheerio')
var request = require('request')
var axios = require('axios')
var instance, _page
// const username = "1073007S";
// const password = "21960402";
const courseList = [];


function init( user,pwd ) {
   var username = user;
   var password = pwd;
  return new Promise((resolve, reject) => {

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
          //console.log('msg: ' + msg)
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
        console.log("login success!")
        _page.render('iLMS.png')
        return _page.property('content')
      })
      .then((content) => {
        var $ = cheerio.load(content)
        /* Get Course Name*/
        $('.mnuBody > .mnuItem > a').each(function(i, elem) {

            if($(this).text() !== '成績查詢'){
              var courseID = $(this).attr('href').match("\\d+")[0];
              courseList[i] = { "name": $(this).text(), "attr": "https://lms.nthu.edu.tw"+$(this).attr('href'), "id": courseID};
            }
          });
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
        console.log(courseList);
        console.log("Login Finish");
      }).then(()=>{
        resolve(courseList)
      })
  })
}


async function getResult() {
  var username = "1073007S";
  var password = "21960402";
  await init(username,password);
  // await pr;
  return {
    Course: [...courseList]
  }
}

getResult();

module.exports = {
  getResult
}
