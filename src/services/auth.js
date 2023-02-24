const userService = require('./user');
const authHelper = require('../helpers/auth/auth');
const ValdiationHelper = require('../helpers/validation/validation');
const CustomerError = require('../helpers/errors/CustomError');
const { NODE_ENV } = process.env;
const cacheService = require('./cache');

const authService = {
    signUp: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await userService.create(data);
                return resolve(authHelper.sendJwtToClient(user));
            } catch (error) {
                return reject(error);
            }
        });
    },
    signIn: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await userService.collection
                    .findOne({ email: data.email, status: 1 })
                    .select('fullName email password');

                if (!user) {
                    return reject(new CustomerError('Not Found User', 404));
                }

                if (!userService.checkUserStatus(user.email)) {
                    return reject(new CustomerError('Not Found User', 404));
                }

                if (!ValdiationHelper.comparePassword(data.password, user.password)) {
                    return reject(new CustomerError('Please check your credentials', 400));
                }

                return resolve(authHelper.sendJwtToClient(user));
            } catch (error) {
                return reject(error);
            }
        });
    },

    getUser: async (userId) => {
        let data;
        if (cacheService.exist(userId)) {
            data = cacheService.get(userId);
        } else {
            data = await userService.collection.findById(userId);
            cacheService.set(userId, data);
        }
        return data;
    },
    signOut: () => {
        return {
            response: {
                success: true,
                message: 'Log Out successful',
            },
            key: 'access_token',
            cookies: {
                httpOnly: true,
                expires: new Date(Date.now()),
                secure: NODE_ENV === 'development' ? false : true,
            },
        };
    },
};

module.exports = authService;
