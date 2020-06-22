/* Goal: Sign in to iLMS, eLearn, Moodle*/
'use strict'
var phantom = require('phantom')
var cheerio = require('cheerio')
var request = require('request')
var axios = require('axios')
var instance, _page
var instance_course, _page_course
const username = "1073007S";
const password = "21960402";

const announcement = [];
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
    _page.render('Home2.png')

  })
  .then(()=>{
    return _page.open('https://lms.nthu.edu.tw/course.php?courseID=43470&f=news')
  })
  .then(status => {
      _page.render('Announcement.png')
  })
  .then(()=> {
    console.log("course log success!")
    //_page.render('Announcement.png')
    return _page.property('content')
  })
  .then((content) => {
    var $ = cheerio.load(content)
    /* Get Course Announcement*/
    $('.thread').each(function(i, elem) {
        announcement[i] = $(this).text();
    });
    /* Get Course Title*/
    $('td[align="left"] > a').each(function(i, elem) {
        title[i] = $(this).text();
        announcePack[i] = {"title": title[i], "Announcement": announcement[i]}
    });
    //announcePack.map( name => { console.log(name)})
    console.log(announcement);
    }
  )
  .then(()=> {
    // const off = _page.off('onLoadFinished');
    // return Promise.all([off])
    instance.exit()
  })
  .catch(e => {
    console.log("Failed! " + e)
    // const off = _page.off('onLoadFinished');
    // return Promise.all([off]).then(()=>{
      instance.exit()
    //})
  });


  Promise.all([pr]).then(()=>{
    console.log("Login Finish");
  })



// const course =
//    phantom
//   .create()
//   .then(ph => {
//     instance_course = ph
//     return instance.createPage()
//   })
//   .then(page => {
//     console.log("!")
//     _page_course = page
//     _page_course.setting('userAgent', "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36")
//     _page_course.on('onConsoleMessage', true, function(msg) {
//       console.log('msg: ' + msg)
//     })
//
//     return _page_course.open('https://lms.nthu.edu.tw/course.php?courseID=43470&f=news')
//   })
//   .then(status => {
//     return new Promise(function (resolve, reject) {
//       _page_course.on('onAlert', function (msg) {
//         reject(msg)
//       })
//       _page_course.on('onLoadFinished', function (status) {
//         console.log("Status: " + status)
//         resolve(status)
//       })
//     })
//   })
//   .then(()=> {
//     console.log("!!")
//     console.log("course log success!")
//     _page_course.render('Announcement.png')
//     return _page_course.property('content')
//   })
//   .then((content) => {
//     _page_course.render('course_announcement2.png')
//     var $ = cheerio.load(content)
//     /* Get Course Announcement*/
//     $('.thread').each(function(i, elem) {
//         announcement[i] = $(this).text();
//     });
//     /* Get Course Title*/
//     $('td[align="left"] > a').each(function(i, elem) {
//         title[i] = $(this).text();
//         announcePack[i] = {"title": title[i], "Announcement": announcement[i]}
//     });
//     //announcePack.map( name => { console.log(name)})
//     console.log(announcement);
//     }
//   )
//   .then(()=> {
//     const off = _page_course.off('onLoadFinished');
//     return Promise.all([off])
//     instance_course.exit()
//   })
//   .catch(e => {
//     console.log("Failed! " + e)
//     const off = _page_course.off('onLoadFinished');
//     return Promise.all([off]).then(()=>{
//       instance_course.exit()
//     })
//   });
//
//   Promise.all([course]).then(()=>{
//     console.log("Course Finish");
//   })

async function getAnnounce() {
  await pr;
  // await course;
  return {
    //Course: [...courseList],
    Announcement: [...announcePack]
  }
}

module.exports = {
  getAnnounce
}
