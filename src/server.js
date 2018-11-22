const conn = require('./lib/mongodb-connect');
const app = require('./lib/app').default;
const PORT = 3456;
conn.open().then(function () {
  app.listen(PORT, function () {
    console.log(`App listening at http://localhost:${PORT}`);
  });
}).catch(function (err) {
  console.error(err);
});
