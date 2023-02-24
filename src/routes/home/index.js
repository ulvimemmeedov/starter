var express = require('express');
var router = express.Router();
var { getAccessToRouteWeb } = require('../../middleware/auth/auth');
var main = require('../../controllers/main');

/* GET home page. */
router.get('/', main.home);

module.exports = router;
