const baseUrl = 'https://elearn.nthu.edu.tw'

export function parseCourseList_elearn() {
    let courseList = [];
    const homeUrl = `${baseUrl}/my/`;
    return get(homeUrl)
      .then((html) => {
        const $ = cheerio.load(html);
        const mycourse = $('div[id="courses-view-in-progress"]').find('div > div > div > div > div >div >div > h4 > a');
        mycourse.each(function(i, elem) {
            let ID = $(elem).attr('href').match("\\d+")[0];
            courseList.push({"name": $(elem).text(), "id": ID});
        });
        courseList.map( name => { console.log(name)})
        return courseList;
      })
      .catch((err) => console.error(err));
  }