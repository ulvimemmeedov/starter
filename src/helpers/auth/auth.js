const jwt = require('jsonwebtoken');

const auth = {
    sendJwtToClient: (user) => {
        const token = user.getTokenFromUserModel();

        const { JWT_COOKIE_EXPIRE, NODE_ENV } = process.env;

        return {
            cookie: {
                key: 'access_token',
                token: `Bearer: ${token}`,
                date: {
                    httpOnly: true,
                    expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) * 1000 * 60),
                    secure: NODE_ENV === 'development' ? false : true,
                },
            },
            response: {
                access_token: `Bearer: ${token}`,
                message: 'Success Auth',
                data: {
                    fullName: user.fullName,
                    email: user.email,
                },
            },
        };
    },

    isTokenIncluded: (req) => {
        return req.cookies.access_token && String(req.cookies.access_token || '').startsWith('Bearer:');
    },

    getAccessTokenFromHeader: (req) => {
        const authorization = req.cookies.access_token;

        const access_token = authorization.split(' ')[1];

        return access_token;
    },
    isTokenIncludedGlobal: (req) => {
        return req.headers.access_token && String(req.headers.access_token || '').startsWith('Bearer:');
    },

    getAccessTokenFromGlobal: (req) => {
        const authorization = req.headers.access_token;

        const access_token = authorization.split(' ')[1];

        return access_token;
    },
    generateConstantToken: (data) => {
        return jwt.sign(data, process.env.GLOBAL_JWT_SECRET_KEY, {});
    },
};

module.exports = auth;
