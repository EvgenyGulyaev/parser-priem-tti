const axios = require('axios');
const cheerio = require('cheerio');

const groups = {
  '09.03.04': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT09.03.046200OSS',
};

class Parser {
  async getStudents(group = '09.03.04') {
    const { data } = await axios.get(groups[group]);
    const $ = cheerio.load(data);
    let tables = $('table');
    const trs = tables[tables.length-1].children[1].children.slice(13);
    return  trs.map( el => {
      return {
        'user': $(el.children[2]).text(),
        'value': $(el.children[26]).text(),
        'score': $(el.children[8]).text()
      }
    }).filter( ({value} = {}) => value.includes(`1.${group} (о, ГБ);`)).reduce( (accum, {user, score} = {}, index) => {
      accum += `${index}. ${user} ${score} \n`;
      return accum;
    }, '');
  }
}

module.exports = new Parser();