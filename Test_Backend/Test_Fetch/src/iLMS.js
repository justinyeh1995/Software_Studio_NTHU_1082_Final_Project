import axios from 'axios';

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

// function get(){
//   fetch('http://localhost:8080/api_ilms/login'
//   , {
//     method: 'GET',
//     // mode:'no-cors',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Request-Method':'GET',
//       'Access-Control-Allow-Origin': '*',
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36'
//     }
//   }
// ).then( res => {console.log(res)});
// }



// Develop server URL
const postBaseUrl = 'http://localhost:8080/api_ilms';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
// const postBaseUrl = 'http://weathermood-2.us-west-1.elasticbeanstalk.com/api';

function get() {
    let url = `${postBaseUrl}/login`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        //console.log(res.data);
        return res.data;
    });
}

function test(){
  let url = `${postBaseUrl}/course`;

  console.log(`Making GET request to: ${url}`);

  return axios.get(url).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);
      //console.log(res.data);
      return res.data;
  });
}

export default {
  post, get, test
}
