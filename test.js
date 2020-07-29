const p = require('./index');

(async () => {
  const data = await p.getStudents();
  console.log('data',  data );
})();