const p = require('./index');

(async () => {
  const data = await p.getStudents('09.06.01');
  console.log('data',  data );
})();