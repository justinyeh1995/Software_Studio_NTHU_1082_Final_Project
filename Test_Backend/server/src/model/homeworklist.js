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
const title = [];
const homeworkPack = [];
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
    //console.log($)
    /* Get Hw Title*/
    $('td[align="left"]').each( function(i, elem) {
        title[i] = $(this).find('> a').text();
        homeworklink[i] = 'https://lms.nthu.edu.tw'+$(this).find(':nth-child(2)').attr('href');
        //console.log(title[i] +" "+homeworklink[i]);
    })
  })
  // .then( () => {openlink(_page)}
  //   )
  .then(()=> {
    var url = homeworklink[0]
    return _page.open(url)
  })
  .then(()=> {
    return _page.property('content')
  })
  .then((content)=> {
        //_page.render('Hw6.png')
        var $ = cheerio.load(content)
        article[0] = $('ol > li').text();
        //console.log(article[0])
        homeworkPack[0] = {"title": title[0], "Content": article[0]};
        console.log(homeworkPack[0])
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

  function openlink(_page){

    setTimeout(function(){
        _page.open(homeworklink[j], function(status) {
            if (status == 'success') {
                    _page.render('example' + j + '.png');
            }
            j++;
            if(j <= 4){
                openlink(_page);
            }else{
               phantom.exit();
            }
        });
      },2000);
    }

async function getHomework() {
  await pr;
  // await course;
  return {
    //Course: [...courseList],
    Homework: [...homeworkPack]
  }
}

module.exports = {
  getHomework
}
