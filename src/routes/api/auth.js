var express = require('express');
var router = express.Router();
var auth = require('../../controllers/auth');
var { userSignUpSchema, userSignInSchema, checkSchema } = require('../../helpers/validation/schemas');
var checkValidation = require('../../middleware/validation/validation');
var { getAccessToRouteApi } = require('../../middleware/auth/auth');

router.post('/signin', checkSchema(userSignInSchema), checkValidation, auth.signin);
router.post('/signup', checkSchema(userSignUpSchema), checkValidation, auth.signup);
router.use(getAccessToRouteApi);
router.get('/signout', auth.signOut);

module.exports = router;
