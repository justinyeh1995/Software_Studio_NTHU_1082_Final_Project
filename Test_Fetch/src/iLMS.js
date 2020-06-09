function post(){ 
console.log("Click Login");
fetch('https://lms.nthu.edu.tw/sys/lib/ajax/login_submit.php?account=1073007S&password=21960402&ssl=1&stay=1', {
  method: 'POST',
  mode:'no-cors',
  headers: {
    // 'Access-Control-Request-Method':'POST',
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36'
  }
 }).then(get()).then(res => console.log(res))

//superagent.get('https://lms.nthu.edu.tw/home.php').then(console.log("!"));
//phantom.ph;
//console.log("!");
}

function get(){
  fetch('https://lms.nthu.edu.tw/home.php'
  // , {
  //   method: 'GET',
  //   mode:'no-cors',
  //   headers: {
  //     'Access-Control-Request-Method':'GET',
  //     'Access-Control-Allow-Origin': 'https://lms.nthu.edu.tw/home.php',
  //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36'
  //   }
  // }
);
}

function test(){
  fetch('https://bleacherreport.com/', {
    // method: 'GET',
    mode:'no-cors',
    credentials: 'include',
    headers: {
      'Access-Control-Request-Method':'GET',
      'Access-Control-Allow-Origin': '*',
      'Sec-Fetch-Dest':'document',
      'Cookie':'br_user=eyJiaW8iOm51bGwsImNvdW50cnkiOiJUVyIsImRlZmF1bHRfdGFncyI6WzU2LDE5LDU2NDAsMjBdLCJmaXJzdF9uYW1lIjpudWxsLCJpZCI6bnVsbCwiaXNfYnJfdmVyaWZpZWQiOmZhbHNlLCJsYXN0X25hbWUiOm51bGwsInBob3RvX3BhdGgiOm51bGwsInByb2ZpbGVfaWQiOm51bGwsInRhZ3MiOltdLCJ0aXRsZSI6bnVsbCwidHlwZSI6IkFub255bW91cyIsInVwZGF0ZWRfYXQiOm51bGwsInVzZXJuYW1lIjpudWxsfQ==; country_code=USA; portmeirion_id=3deddc0e-a072-4c2f-9143-7073f8c2460f; session_count=1; br_user_type=Anonymous; _cb_ls=1; _cb=CNymt-CrCfR7BUQvn; orbis_session=%7B%22userID%22%3A%2256f8dbb1-123f-43cd-a9e1-afdc82212b7d%22%2C%22sessionToken%22%3A%22eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkQXQiOjE1ODUzNDcyMDYwMDAsImV4cGlyZXNBdCI6MTU4NzE0NzIwNjAwMCwibWVkaWFJZHMiOlsiN2NiZjhmZjMtMDY0ZS00MGY4LTkxZGMtYTM3Njk0MGNmZWM4Il0sInJlcXVlc3RvcklkIjoiaXNwLW9yYmlzIiwicmVzb3VyY2VJZCI6ImNhdGNoc3BvcnRzIiwic2Vzc2lvbkd1aWQiOiJjYXRjaHNwb3J0cy01NmY4ZGJiMS0xMjNmLTQzY2QtYTllMS1hZmRjODIyMTJiN2QtMTU4NTM0NzIwNi4wIiwic3RyZWFtVXJscyI6WyJodHRwczovL2JsZWFjaGVybGl2ZS5ha2FtYWl6ZWQubmV0L2hscy9saXZlLzIwMDY2NjIvbWFuX3V0ZF90dl92Mi91cy1vbmx5L2luZGV4Lm0zdTgiXSwidG9rZW5JZCI6ImQxZDE5YzI0LWRjNDYtNDJmMC05NGFhLTVhZDhhNjM1M2IzNiIsInVzZXJJZCI6ImNhdGNoc3BvcnRzLTU2ZjhkYmIxLTEyM2YtNDNjZC1hOWUxLWFmZGM4MjIxMmI3ZCJ9.bn2CCx70V7KQTh3qX_ROcs6vIZyMJ309qh-wpusp7BM%22%7D; _fbp=fb.1.1591532287703.1838713137; ads_session=9; __gads=ID=0cdee39231a27525:T=1591532291:S=ALNI_MYqNwT1jVCLvrxt4p2wvB5ppIV1LA; first_pageview=false; _cb_svref=null; utag_main=v_id:01728eb76326001d902e2368ca4203072001b06a007e8$_sn:1$_se:6$_ss:0$_st:1591534966903$ses_id:1591532282665%3Bexp-session$_pn:3%3Bexp-session; _chartbeat2=.1591532284977.1591533166932.1.C_dF2uCOJIc9CCssMCHxSeJicsjC.2; OptanonConsent=isIABGlobal=false&datestamp=Sun+Jun+07+2020+20%3A32%3A47+GMT%2B0800+(Taipei+Standard+Time)&version=5.9.0&landingPath=https%3A%2F%2Fbleacherreport.com%2F&groups=smv%3A1%2Cadv%3A1%2CBG150%3A1%2Cpf%3A1%2Cpz%3A1%2Csm%3A1%2Creq%3A1&hosts=&consentId=5c83559d-3729-40f8-a77d-f44c29cb5ec3&interactionCount=0; _chartbeat5=0,100,%2F,https%3A%2F%2Fbleacherreport.com%2Farticles%2F2894431-bryantto-shaq-the-truth-about-the-lob-that-launched-a-dynasty,Br3Ot9pk5T6BA7cAqDDmnefDZhm_0,,r,C1sIzeClO1J4Cjpwl7DjS17aDkwTEe,bleacherreport.com',
      'Cache-Control': 'max-age=0'
      
    }
}).then(res => {console.log(res.text())});
}

export default {
  post, get, test
}