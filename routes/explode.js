var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('explode', { title: 'Explode' });
});

module.exports = router;