var axios = require("axios");
var cheerio = require("cheerio");

const account = "1073007S";
const passwords = "21960402";
const loginURL = 'https://elearn.nthu.edu.tw/login/index.php';
const myURL = 'https://elearn.nthu.edu.tw/my/';
//const url = `https://lms.nthu.edu.tw/sys/lib/ajax/login_submit.php?account=${account}&password=${password}&ssl=1&stay=1`;
axios.defaults.withCredentials = true
function login() {
  return axios
    .get(loginURL)
    .then((res) => {
      console.log("loggining...");
      var re = /(\S+);/
      var cookie = res.headers['set-cookie']
      //.map((cookie) => { return cookie.match(re)[1]})
      var cookieStr = cookie.join('; ')
      console.log(cookieStr)
      var $ = cheerio.load(res.data);
      //console.log($('.loginpanel').text())
      var token = $("#above-header > div > :nth-child(2) > form > :nth-child(1)");
      console.log(token.attr('value'))
      return {token, cookieStr};
    })
    .then((object)=> {
      //console.log(object)
      const {cookieStr, token} = object;
      //return axios.post('https://elearn.nthu.edu.tw/login/index.php?username=1073007S&password=21960402&anchor=&logintoken=ITuAV7s6L9zmw2U76itNfYGCTFmyLRFF')
      // console.log(token)
      return axios({
        method: 'post',
        url: 'https://elearn.nthu.edu.tw/login/index.php',
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded', 
          // 'Cookie' : cookieStr
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
          'Cache-Control': 'max-age=0',
          'Connection': 'keep-alive',
          'Content-Length': '87',
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Cookie': '_ga=GA1.3.1613988568.1584422725; TS01385550_30=011227fc7791fef9507668c6ca06a15b35e42a8c3b90370cd17167a8b29e92f16274a4b311e9c4b0e7a9bf7d15549e63c708c3228b; ctx=1oOfe0tvR0iuHztyEy9+pIs/bB0A020; MoodleSessionM35=voi83u9o76b3v4jotvlgvo9vuq; TS01385550=0140e1c48e4ed18655a891cb2095995da5a40c7d3df0a657c5b6e534ea12e6f96892b8011325cd7ceb1a8335596b896516bea3d895b81876b8c65c6ae6473e15e6bcb27db2e584e58eb41635d222aff9b24cae9ede',
          'Cookie': 'MOODLEID1_M35=F%25A1%2521%25E1.%25ADI%25D7',
          'Host': 'elearn.nthu.edu.tw',
          'Origin': 'https://elearn.nthu.edu.tw',
          'Referer': 'https://elearn.nthu.edu.tw/login/index.php',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-User': '?1',
          'Upgrade-Insecure-Requests': 1,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        }, 
        data: {
          username: account,
          password: passwords,
          anchor: '',
          logintoken: token.attr('value'),
        }
      }) 
    })
    .then( res=> { 
      console.log(res.status)
      //console.log(res.location)
      return axios
        .get('https://elearn.nthu.edu.tw/login/index.php?testsession=21971')
    })
    .then(res => {console.log(res.status)})
    // .then(() => { 
    //   return axios
    //     .get(myURL)
    //     .then(res=>{console.log(res.data)})
    // })
    .catch((err) => console.error(err));
}

login()

module.exports = {
  login
}