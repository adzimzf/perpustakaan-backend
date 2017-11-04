var express = require('express');
var router = express.Router();

//fake database
var users = {
    'adzim':{
        'age':21,
        'sex':'male',
        'birthday' : '1995-07-02'
    },
    'bejo': {
        'age' : 20,
        'sex':'male',
        'birthday'  : '1995-02-03'
    }
}

//fake model
var findByUserName = function (username, callback) {
    // Perform database query that calls callback when it's done
    // This is our fake database
    if (!users[username]) {
        return callback(new Error('No matching '+username));
    }

    return callback(null, users[username]);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/:username', function (req, res, next) {
    var username = req.params.username;
    findByUserName(username, function (error, user) {
        if (error) return next(error);

        return res.send(user);
    })
});

module.exports = router;
