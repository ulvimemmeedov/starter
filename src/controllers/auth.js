const errorWrapper = require('../helpers/errors/errorWraper');
const authService = require('../services/auth.js');
const response = require('../helpers/response/response');

const auth = {
    signup: errorWrapper(async (req, res) => {
        const result = await authService.signUp(req.locals.data);

        res.cookie(result.cookie.key, result.cookie.token).status(200).json(response.success(result.response));
    }),
    signin: errorWrapper(async (req, res) => {
        const result = await authService.signIn(req.locals.data);
        res.cookie(result.cookie.key, result.cookie.token).status(200).json(response.success(result.response));
    }),
    signOut: errorWrapper(async (req, res, next) => {
        const result = authService.signOut();
        req.locals.user = {};
        req.locals.token = {};

        if (req.query.notApi === '1') return res.status(200).cookie(result.key, result.cookies).redirect('/signin');

        return res.status(200).cookie(result.key, result.cookies).json(response.success(result.response));
    }),
};

module.exports = auth;
