// Library import
const jwt = require('jsonwebtoken');
// Module import
const authHelpers = require('../../helpers/auth/auth');
const catchErrors = require('../../helpers/errors/catchErrors');
const CustomError = require('../../helpers/errors/CustomError');
// Variable import
const { JWT_SECRET_KEY, GLOBAL_JWT_SECRET_KEY } = process.env;
// Auth
const auth = {
    getAccessToRouteApi: (req, res, next) => {
        if (!authHelpers.isTokenIncluded(req)) {
            return next(new CustomError('You are not authorized to access this route', 401));
        }

        const access_token = authHelpers.getAccessTokenFromHeader(req);

        jwt.verify(access_token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                // if (process.env.NODE_ENV == 'development') {
                //     catchErrors(err);
                // }
                return next(new CustomError('You are not authorized to access this route', 401));
            }

            req.locals.user = {
                id: decoded.id,
                fullName: decoded.fullName,
                email: decoded.email,
                role: decoded.role,
            };

            next();
        });
    },
    getAccessToRouteApiGlobal: (req, res, next) => {
        if (!authHelpers.isTokenIncludedGlobal(req)) {
            return next(new CustomError('You are not authorized to access this route', 401));
        }

        const access_token = authHelpers.getAccessTokenFromGlobal(req);

        jwt.verify(access_token, GLOBAL_JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                // if (process.env.NODE_ENV == 'development') {
                //     catchErrors(err);
                // }
                return next(new CustomError('You are not authorized to access this route', 401));
            }
            next();
        });
    },
    getAccessToRouteWeb: (req, res, next) => {
        if (!authHelpers.isTokenIncluded(req)) {
            return res.redirect('/signin');
            // return next(new CustomError('You are not authorized to access this route', 401));
        }

        const access_token = authHelpers.getAccessTokenFromHeader(req);

        jwt.verify(access_token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                // if (process.env.NODE_ENV == 'development') {
                //     catchErrors(err);
                // }
                return res.redirect('/signin');
                // return next(new CustomError('You are not authorized to access this route', 401));
            }
            req.locals.user = {
                id: decoded.id,
                fullName: decoded.fullName,
                email: decoded.email,
                role: decoded.role,
            };

            next();
        });
    },
};
module.exports = auth;
