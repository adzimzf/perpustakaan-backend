var express = require('express');
var router = express.Router();

//route
var users = require('./users'),
    buku  = require('./buku');

//middleware
var auth = require('../middlewares/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('should redirect to login page')
});

router.use('/users', users);
router.use(auth);
router.use('/buku', buku);

module.exports = router;
