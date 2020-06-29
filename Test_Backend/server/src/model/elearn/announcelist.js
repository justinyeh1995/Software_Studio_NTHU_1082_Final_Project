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
const url = "https://elearn.nthu.edu.tw/course/view.php?id=5387"

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
  // .then(status => {
  //     _page.render('Announce.png')
  // })
  .then(()=> {
    return _page.property('content')
  })
  .then((content) => {
    var $ = cheerio.load(content)
    /* Get Course Announcement*/
    const forum = $('#section-0 > .content > ul');
    var announceURL = forum.find(':nth-child(1) > a').attr('href');
    //console.log(announceURL)
    return announceURL;  
    }
  )
  .then((url)=> {
    return _page.open(url)
  })
  .then(()=> {
    return _page.property('content')
  })
  .then((content) => {
    var $ = cheerio.load(content)
    /* Get Course Announcement*/
    const list = $('tbody');
    list.find('tr').each(function(i, elem) {
      var id =  $(elem).find(':nth-child(1) > a').attr('href').match('\\d+')[0];
      var title =  $(elem).find(':nth-child(1) > a').text();
      var dateStr = $(elem).find('.lastpost > :nth-child(3)').text();
      var date = parseDate_elearn(dateStr);
      //console.log(date)
      announcementlist.push({"id": id, "title": title, "date": date })
    })
    announcementlist.map(name=> {console.log(name.id, name.title, name.date)})
    return announcementlist;  
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

  function RemoveChinese(strValue) {  
        if(strValue!= null && strValue != ""){  
            var reg = /[\u4e00-\u9fa5]|[(]|[)]/g;   
           return strValue.replace(reg, " ");   
        }  
        else  
            return "";  
    }  

  function parseDate_elearn(dateStr) {
    console.log(RemoveChinese(dateStr))
    const match = RemoveChinese(dateStr).split(/\s+/);
    return {
      year: match[0],
      month: match[1],
      day: match[2],
      hour: match[3].split(":")[0],
      minute: match[3].split(":")[1],
      second: '00'
    };
  }  

async function getAnnounce() {
  await pr;
  return {
    Announcement: [...announcementlist]
  }
}

module.exports = {
  getAnnounce
}
