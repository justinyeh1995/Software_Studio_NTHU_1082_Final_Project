import cheerio from "react-native-cheerio";
import get from "./fetch";

const baseUrl = "https://lms.nthu.edu.tw";

export function parseCourseList() {
  let courseList = [];
  const homeUrl = `${baseUrl}/home.php`;
  return get(homeUrl)
    .then((html) => {
      const $ = cheerio.load(html);
      const mnuItems = $(".mnuItem", ".mnuBody").find("a");
      const len = mnuItems.length;
      mnuItems.each((i, elem) => {
        if (i !== len - 1) {
          courseList[i] = {
            name: $(elem).text(),
            id: $(elem).attr("href").match("\\d+")[0],
          };
        }
      });
      // console.log(courseList);
      return courseList;
    })
    .catch((err) => console.error(err));
}

export function parseAnnouncementList(courseID) {
  const announceUrl = `${baseUrl}/course.php?courseID=${courseID}&f=news`;
  return get(announceUrl)
    .then((html) => {
      const $ = cheerio.load(html);
      const items = $(".item", ".page");
      const pages = items.length ? items.length - 2 + 1 : 1;
      return pages;
    })
    .then((pages) => {
      let urls = [];
      for (let page = 1; page <= pages; page++) {
        let url = `${baseUrl}/course.php?courseID=${courseID}&f=news&page=${page}`;
        urls.push(parseAnnouncementListHelper(url));
      }
      return urls;
    })
    .then((urls) => {
      let announcementList = [];
      let index = 0;
      return Promise.all(urls)
        .then((results) => {
          for (let i = 0; i < results.length; ++i) {
            for (let j = 0; j < results[i].length; ++j) {
              announcementList[index++] = results[i][j];
            }
          }
          return announcementList;
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

function parseAnnouncementListHelper(url) {
  return get(url)
    .then((html) => {
      let $ = cheerio.load(html);
      const row2 = $("#main > .tableBox > table > tbody > .row2");
      if (row2.length === 1 && row2.find("td").length === 1) return [];
      return $("#main tr")
        .filter((i) => i % 2 === 1)
        .map((i, tr) => {
          const td = $(tr).find("td");
          const dateStr = td.eq(3).find("span").attr("title");
          return {
            id: td.eq(0).text(),
            title: td.eq(1).text(),
            date: parseDate(dateStr),
          };
        });
    })
    .catch((err) => console.error(err));
}

export function parseAnnouncementItem(courseID, newsID) {
  let attachList = [];
  let announcePack = [];
  const url = `${baseUrl}/course.php?courseID=${courseID}&f=news_show&newsID=${newsID}`;
  return get(url)
    .then((html) => {
      let description = [];
      const $ = cheerio.load(html);
      const title = $(".doc > .title");
      const article = $(".article");
      const attach = $(".attach > div > a");
      attach.each(function (i, elem) {
        attachList.push({
          name: $(elem).text(),
          downloadlink: "https://lms.nthu.edu.tw" + $(elem).attr("href"),
        });
      });
      article.find("div").each(function (i, elem) {
        description.push($(elem).text());
      });
      var content = description.join("\n");

      announcePack.push({
        title: title.text(),
        Announcement: content,
        attach: attachList,
      });
      return announcePack;
    })
    .catch((err) => console.error(err));
}

export function parseMaterialList(courseID) {
  const materialUrl = `${baseUrl}/course.php?courseID=${courseID}&f=doclist`;
  return get(materialUrl)
    .then((html) => {
      const $ = cheerio.load(html);
      const items = $(".item", ".page");
      const pages = items.length ? items.length - 2 + 1 : 1;
      return pages;
    })
    .then((pages) => {
      let urls = [];
      for (let page = 1; page <= pages; page++) {
        let url = `${baseUrl}/course.php?courseID=${courseID}&f=doclist&page=${page}`;
        urls.push(parseMaterialListHelper(url));
      }
      return urls;
    })
    .then((urls) => {
      let materialList = [];
      let index = 0;
      return Promise.all(urls)
        .then((results) => {
          for (let i = 0; i < results.length; ++i) {
            for (let j = 0; j < results[i].length; ++j) {
              materialList[index++] = results[i][j];
            }
          }
          return materialList;
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

function parseMaterialListHelper(url) {
  let materialList = [];
  // let link = [];
  let title = [];
  let time = [];
  let materialID = [];
  return get(url)
    .then((html) => {
      const $ = cheerio.load(html);
      const table = $(".tableBox > table > tbody > tr");
      const row2 = $("#main > .tableBox > table > tbody > .row2");
      if (row2.length === 1 && row2.find("td").length === 1) return [];
      table.each(function (i, elem) {
        title[i] = $(elem).find('td[align="left"] > div > a').text();
        // link[i] =
        //   "https://lms.nthu.edu.tw" +
        //   $(elem).find('td[align="left"] > div > a').attr("href");
        materialID[i] = $(elem).find('td[align="left"] > div > a').attr("href");
        time[i] = $(elem).find(":nth-child(6) > span").attr("title");
      });
      title.shift();
      // link.shift();
      materialID.shift();
      time.shift();

      for (let i = 0; i < title.length; i++) {
        time[i] = parseDate(time[i]);
        materialID[i] = materialID[i].match(/\d+/g).map(Number)[1];
        materialList.push({
          title: title[i],
          // link: link[i],
          id: materialID[i],
          time: time[i],
        });
      }
      return materialList;
    })
    .catch((err) => console.error(err));
}

export function parseMaterialItem(courseID, materialID) {
  let title = [];
  let video = [];
  let attachment = [];
  let materialItemPack = [];
  const url = `${baseUrl}/course.php?courseID=${courseID}&f=doc&cid=${materialID}`;
  return get(url)
    .then((html) => {
      const $ = cheerio.load(html);

      const docTitle = $(".doc > .title");
      docTitle.each(function (i, elem) {
        title.push($(elem).text());
      });

      const vid = $(".article > div > div > video");
      vid.each(function (i, elem) {
        video.push("https://lms.nthu.edu.tw" + $(this).attr("src"));
      });

      const attach = $(".attach > .block > div > :nth-child(2)");
      attach.each(function (i, elem) {
        var attachlink = "https://lms.nthu.edu.tw" + $(elem).attr("href");
        var title = $(elem).attr("title");
        attachment.push({ title: title, link: attachlink });
      });

      const article = $(".article");
      var articleline = []
      // let parent = $(elem).find(".postNote");
      var firstText = article
          .clone() //clone the element
          .children() //select all the children
          .remove() //remove all the children
          .end() //again go back to selected element
          .text();

      articleline.push(firstText.replace(/\s/g, ""));
      article.find("div").each(function(i, elem) {
        articleline.push($(elem).text())
      })
      var content = articleline.join('\n')
      // console.log(content)

      materialItemPack.push({
        title: title,
        video: video,
        attachment: attachment,
        article: content,
      });
      return materialItemPack;
    })
    .catch((err) => console.error(err));
}

export function parseHomeworkList(courseID) {
  const homeworkUrl = `${baseUrl}/course.php?courseID=${courseID}&f=hwlist`;
  return get(homeworkUrl)
    .then((html) => {
      const $ = cheerio.load(html);
      const items = $(".item", ".page");
      const pages = items.length ? items.length - 2 + 1 : 1;
      return pages;
    })
    .then((pages) => {
      let urls = [];
      for (let page = 1; page <= pages; page++) {
        let url = `${baseUrl}/course.php?courseID=${courseID}&f=hwlist&page=${page}`;
        urls.push(parseHomeworkListHelper(url));
        return urls;
      }
    })
    .then((urls) => {
      let homeworkList = [];
      let index = 0;
      return Promise.all(urls)
        .then((results) => {
          for (let i = 0; i < results.length; ++i) {
            for (let j = 0; j < results[i].length; ++j) {
              homeworkList[index++] = results[i][j];
            }
          }
          return homeworkList;
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

function parseHomeworkListHelper(url) {
  let title = [];
  let homeworkID = [];
  let time = [];
  let homeworklistPack = [];
  return get(url)
    .then((html) => {
      const $ = cheerio.load(html);
      if ($("#main > .tableBox").length === 0) return [];
      const table = $(".tableBox > .table > tbody > tr");
      table.each(function (i, elem) {
        title[i] = $(elem).find('td[align="left"] > a').text();
        homeworkID[i] = $(elem)
          .find('td[align="left"]')
          .find(" :nth-child(2)")
          .attr("href");
        time[i] = $(elem).find(":nth-child(5) > span").attr("title");
      });
      title.shift();
      homeworkID.shift();
      time.shift();

      for (let i = 0; i < title.length; i++) {
        time[i] = parseDate(time[i]);
        homeworkID[i] = homeworkID[i].match(/\d+/g).map(Number)[1];
        homeworklistPack[i] = {
          title: title[i],
          id: homeworkID[i],
          time: time[i],
        };
      }
      return homeworklistPack;
    })
    .catch((err) => console.error(err));
}

export function parseHomeworkItem(courseID, homeworkID) {
  let attachment = [];
  let homeworkPack = [];
  const homeUrl = `${baseUrl}/course.php?courseID=${courseID}&f=hw&hw=${homeworkID}`;
  return get(homeUrl)
    .then((html) => {
      var description = [];
      const $ = cheerio.load(html);
      const item = $(".infoTable > table > tbody > :nth-child(7)");
      item.find("a").each(function (i, elem) {
        var link = "https://lms.nthu.edu.tw" + $(this).attr("href");
        var attachname = $(this).text();
        attachment.push({ attachname: attachname, link: link });
      });
      var article = $(".infoTable > table > tbody > :nth-child(8)").find(
        ":nth-child(2)"
      );

      article.find("ol > li").each(function (i, elem) {
        description.push($(elem).text());
      });

      article.find("div").each(function (i, elem) {
        description.push($(elem).text());
      });
      var content = description.join("\n");
      // console.log(content);
      homeworkPack.push({ Content: content, attachment: attachment });
      return homeworkPack;
    })
    .catch((err) => console.error(err));
}

export function parseGradeList(courseID) {
  let scoretitle = [];
  let scores = [];
  let scorePack = [];
  const homeUrl = `${baseUrl}/course.php?courseID=${courseID}&f=score`;
  return get(homeUrl)
    .then((html) => {
      const $ = cheerio.load(html);
      $(".header > .td").each(function (i, elem) {
        var scorename = $(elem).text();
        scoretitle.push(scorename);
      });

      $("#t1_tr0 > .td").each(function (i, elem) {
        var score = $(elem).text();
        scores.push(score);
      });

      for (let i = 0; i < 4; i++) {
        scoretitle.shift();
        scores.shift();
      }

      for (let i = 0; i < scores.length; i++) {
        scorePack.push({ title: scoretitle[i], score: scores[i] });
      }
      return scorePack;
    })
    .catch((err) => console.error(err));
}

export function parseForumList(courseID) {
  const forumUrl = `${baseUrl}/course.php?courseID=${courseID}&f=forumlist`;
  return get(forumUrl)
    .then((html) => {
      const $ = cheerio.load(html);
      const items = $(".item", ".page");
      const pages = items.length ? items.length - 2 + 1 : 1;
      return pages;
    })
    .then((pages) => {
      let urls = [];
      for (let page = 1; page <= pages; page++) {
        let url = `${baseUrl}/course.php?courseID=${courseID}&&f=forumlist&page=${page}`;
        urls.push(parseForumListHelper(url));
      }
      return urls;
    })
    .then((urls) => {
      let forumlist = [];
      let index = 0;
      return Promise.all(urls)
        .then((results) => {
          for (let i = 0; i < results.length; ++i) {
            for (let j = 0; j < results[i].length; ++j) {
              forumlist[index++] = results[i][j];
            }
          }
          return forumlist;
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

function parseForumListHelper(url) {
  let postID = [];
  let title = [];
  let time = [];
  let forumlistPack = [];
  let forumlist = [];
  return get(url)
    .then((html) => {
      const $ = cheerio.load(html);
      const table = $(".tableBox > .table > tbody > tr");
      const row2 = $("#main > .tableBox > table > tbody > .row2");
      const re = /(\d+-\d+\s\d+:\d+),/;
      if (row2.length === 1 && row2.find("td").length === 1) return [];
      table.each(function (i, elem) {
        title[i] = $(elem).find('td[align="left"] > div >a > span').text();
        postID[i] = $(elem).find('td[align="left"] > div >a > span').attr("id");
        time[i] = $(elem).find(":nth-child(4) > div").text();
      });
      title.shift();
      postID.shift();
      time.shift();

      for (let i = 0; i < title.length; i++) {
        if (postID[i] != undefined) {
          postID[i] = postID[i].match(/\d+/g)[0];
        }
        if (!(i % 2)) {
          time[i] = parseForumDate(time[i].match(re)[1]);
        }
        forumlistPack[i] = {
          title: title[i],
          id: postID[i],
          time: time[i],
        };
      }

      for (let i = 0; i < forumlistPack.length / 2; i++) {
        forumlist.push(forumlistPack[2 * i]);
      }

      return forumlist;
    })
    .catch((err) => console.error(err));
}

export function parseForumItem(courseID, forumID) {
  let postBox = [];

  const url = `${baseUrl}/course.php?courseID=${courseID}&f=forum&tid=${forumID}`;
  return get(url)
    .then((html) => {
      const $ = cheerio.load(html);
      const postlist = $(".postBody");
      postlist.each(function (i, elem) {
        let attach = [];
        let postBody = [];
        let postAuthor = $(elem).find(".postAuthor").text();
        let postNote = $(elem).find(".postNote > div");

        let parent = $(elem).find(".postNote");
        var firstText = parent
          .clone() //clone the element
          .children() //select all the children
          .remove() //remove all the children
          .end() //again go back to selected element
          .text();
        // console.log(firstText)

        postBody.push(" ");
        postBody.push(firstText.replace(/\s/g, ""));

        postNote.each(function (i, elem) {
          postBody.push($(elem).text());
          if ($(elem).find("a").length != 0) {
            attach.push({
              title: $(elem).find("a").text(),
              link: `${baseUrl}` + $(elem).find("a").attr("href"),
            });
          }
        });
        postBody.push(" ");
        var postItem = postBody.join("\n");

        postBox.push({
          floor: i + 1,
          author: postAuthor,
          Note: postItem,
          attachment: attach,
        });
      });
      // console.log(postBox)
      return postBox;
    })
    .catch((err) => console.error(err));
}

function parseForumDate(dateStr) {
  const match = dateStr.match(/(\d+)-(\d+)\s+(\d+):(\d+)/);
  return {
    month: match[1],
    day: match[2],
    hour: match[3],
    minute: match[4],
  };
}

function parseDate(dateStr) {
  const match = dateStr.match(/(\d+)-(\d+)-(\d+)\s+(\d+):(\d+):(\d+)/);
  return {
    year: match[1],
    month: match[2],
    day: match[3],
    hour: match[4],
    minute: match[5],
    second: match[6],
  };
}
