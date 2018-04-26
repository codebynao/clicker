var express = require('express');
var router = express.Router();
var clic = 0;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AC Clicker' });
});


module.exports = router;
