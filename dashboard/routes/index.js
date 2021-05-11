const express = require('express');
const router = express.Router();
const db = require('../helpers/database');

router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/updates', function(req, res, next) {
  const last_id = req.query.last

  if (!last_id)
    res.status(400).send('No last id parameter');

  db.all(`SELECT * FROM Tweet where id > ${last_id}  ORDER BY id desc LIMIT 100`, [], (err, rows) => {
    if (err) {
      throw err;
    }
     db.all('SELECT sentiment, count(sentiment) as count FROM Tweet GROUP BY sentiment', [], (err, counts) => {
      if (err) {
        throw err;
      }
      res.send({
        rows : rows,
        counts : counts
      });
    });
  });
});

module.exports = router;
