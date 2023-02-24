var express = require('express');
var router = express.Router();
var home = require('./home/index');
var api = require('./api/index.js');

/* GET home page. */
router.use('/', home);
router.use('/api', api);

module.exports = router;
