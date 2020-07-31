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

  '28.04.01': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGEP28.04.0168038OSS',
  '27.04.04': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT27.04.0468035OSS',
  '27.04.03': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT27.04.0368034OSS',
  '15.04.04': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT15.04.046802OSS',
  '15.04.06': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT15.04.066801OSS',
  '20.04.01': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGEP20.04.0168029OSS',
  '13.04.02': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT13.04.026801OSS',
  '12.04.04': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGEP12.04.046801OSS',
  '12.04.01': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT12.04.0168028OSS',
  '11.04.04': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGEP11.04.046802OSS',
  '11.04.03': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGEP11.04.0368099OSS',
  '11.04.02': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT11.04.0268027OSS',
  '11.04.01': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGRT11.04.016801OSS',
  '09.04.04': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT09.04.0468026OSS',
  '09.04.03': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT09.04.036809OSS',
  '09.04.01': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT09.04.016800OSS',
  '01.04.02': 'https://www.sfedu.ru/php_j/abitur/show.php?finance=b&list=TGKT01.04.026809OSS',
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

const master = [
  '28.04.01',
  '27.04.04',
  '27.04.03',
  '15.04.04',
  '15.04.06',
  '20.04.01',
  '13.04.02',
  '12.04.04',
  '12.04.01',
  '11.04.04',
  '11.04.03',
  '11.04.02',
  '11.04.01',
  '09.04.04',
  '09.04.03',
  '09.04.01',
  '01.04.02',
];

class Parser {
  async getStudents(group = '09.03.04') {
    const { data } = await axios.get(groups[group]);
    const $ = cheerio.load(data);
    let tables = $('table');
    const trs = tables[tables.length - 1].children[1].children.slice(13);
    return trs.map((el) => {
      const valueIndex = aspirantura.includes(group) ? 28 : master.includes(group) ? 14 : 26;
      const scoreIndex = aspirantura.includes(group) ? 10 : 8;
      return {
        'user': $(el.children[2]).text(),
        'value': $(el.children[valueIndex]).text(), // Для аспирантов это 28 а магистры это 14
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