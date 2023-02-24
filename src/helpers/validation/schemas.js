var { checkSchema } = require('express-validator');

const userSignUpSchema = {
    password: {
        isLength: {
            errorMessage: 'Password should be at least 8 chars long',
            options: { min: 8 },
        },
    },
    fullName: {
        isUppercase: {
            negated: true,
        },
        rtrim: {
            options: [' -'],
        },
    },
    email: {
        isEmail: {
            bail: true,
        },
    },
    userName: {},
    role: {},
};
const userSignInSchema = {
    password: {
        isLength: {
            errorMessage: 'Password should be at least 8 chars long',
            options: { min: 8 },
        },
    },
    email: {
        isEmail: {
            bail: true,
        },
    },
};

module.exports = {
    userSignUpSchema,
    userSignInSchema,
    checkSchema,
};
