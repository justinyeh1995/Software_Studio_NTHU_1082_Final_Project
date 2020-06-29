/* Goal: Sign in to iLMS, eLearn, Moodle*/
'use strict'
var phantom = require('phantom')
var cheerio = require('cheerio')
var request = require('request')
var axios = require('axios')
var instance, _page
const username = "1073007S";
const password = "21960402";
const article = [];
const homeworklink = [];
const homeworkID = [];
const title = [];
const homeworklistPack = [];
const time = [];
var j = 0;
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
    _page.render('Home3.png')

  })
  .then(()=>{
    return _page.open('https://lms.nthu.edu.tw/course.php?courseID=43470&f=hwlist')
  })
  .then(status => {
      _page.render('Homework.png')
  })
  .then(()=> {
    //_page.render('Announcement.png')
    return _page.property('content')
  })
  .then((content) => {
    var $ = cheerio.load(content)
    /* Get Hw Title ID*/
    // $('td[align="left"]').each( function(i, elem) {
    //     title[i] = $(this).find('> a').text();
    //     //homeworklink[i] = 'https://lms.nthu.edu.tw'+$(this).find(':nth-child(2)').attr('href');
    //     homeworkID[i] = $(this).find(':nth-child(2)').attr('href')
    //     // .match(/\d+/g).map(Number)[1]
    //     console.log(homeworkID[i]);
    //     homeworklistPack[i] = {"title": title[i], "id": homeworkID[i]};
    // })

    const table = $('.tableBox > .table > tbody > tr')
    table.each(function(i, elem) {
      title[i] = $(elem).find('td[align="left"] > a').text();
      homeworkID[i] = $(elem).find('td[align="left"]').find(' :nth-child(2)').attr('href')
      time[i] =  $(elem).find(':nth-child(5) > span').text();
    })
    title.shift();
    homeworkID.shift();
    time.shift();

    for(let i = 0; i < title.length; i++) {
      time[i] = parseDate(time[i])
      homeworkID[i] = homeworkID[i].match(/\d+/g).map(Number)[1]
      homeworklistPack[i] = {"title": title[i], "id": homeworkID[i], "time": time[i]};
    }

    homeworklistPack.map( name => { console.log(name)})
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

 function parseDate(dateStr) {
    const match = dateStr.match(/(\d+)-(\d+) (\d+):(\d+)/);

    return {
      month: match[1],
      day: match[2],
      hour: match[3],
      minute: match[4],
    };
  }
  
async function getHomeworkList() {
  await pr;
  return {
    HomeworkList: [...homeworkPack]
  }
}

module.exports = {
  getHomeworkList
}
