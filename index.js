const axios = require('axios');
const cheerio = require('cheerio');

const groups = {
  '09.03.04': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT09.03.046200OSS',
  '09.03.01': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT09.03.016200OSS',
  '09.03.02': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT09.03.026200OSS',
  '02.03.03': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT02.03.036200OSS',
  '10.03.01': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT10.03.016200OSS',
  '11.03.01': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT11.03.016200OSS',
  '11.03.02': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT11.03.026200OSS',
  '11.03.03': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGEP11.03.036200OSS',
  '11.03.04': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGEP11.03.046200OSS',
  '12.03.04': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGEP12.03.046200OSS',
  '13.03.02': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT13.03.026200OSS',
  '15.03.06': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT15.03.066200OSS',
  '17.03.01': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT17.03.016200OSS',
  '20.03.01': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGEP20.03.016200OSS',
  '25.03.01': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT25.03.016200OSS',
  '27.03.03': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT27.03.036200OSS',
  '27.03.04': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT27.03.046200OSS',
  '28.03.02': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGEP28.03.026200OSS',
  '38.03.04': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGUE38.03.046200OSS',
  '38.03.05': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGUE38.03.056200OSS',
  '09.06.01': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT09.06.017200OSS',
  '03.06.01': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGEP03.06.017200OSS',
  '10.06.01': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT10.06.017200OSS',
  '11.06.01': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGIT11.06.017200OSS',
  '12.06.01': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGEP12.06.017200OSS',
  '15.06.01': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT15.06.017200OSS',
  '24.06.01': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT24.06.017200OSS',
  '27.06.01': 'https://sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT27.06.017200OSS',
};

const aspirantura = [
  '09.06.01',
  '03.06.01',
  '10.06.01',
  '11.06.01',
  '12.06.01',
  '15.06.01',
  '24.06.01',
  '27.06.01',
];

class Parser {
  async getStudents(group = '09.03.04') {
    const { data } = await axios.get(groups[group]);
    const $ = cheerio.load(data);
    let tables = $('table');
    const trs = tables[tables.length - 1].children[1].children.slice(13);
    return trs.map((el) => {
      const valueIndex = aspirantura.includes(group) ? 28 : 26;
      const scoreIndex = aspirantura.includes(group) ? 10 : 8;
      return {
        'user': $(el.children[2]).text(),
        'value': $(el.children[valueIndex]).text(), // Для аспирантов это 28
        'score': $(el.children[scoreIndex]).text()  //  Для аспирантов 10 
      }
    })
    .filter(({ value } = {}) => value.includes(`1.${group} (о, ГБ);`) || value.includes(`1.${group} (о, ЦП);`))
    .slice(0, 54)
    .reduce((accum, { user, score } = {}, index) => {
      accum += `${index + 1}. ${user} ${score} \n`;
      return accum;
    }, '');
  }
}

module.exports = new Parser();