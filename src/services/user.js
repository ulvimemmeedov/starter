const userCol = require('../collections/User');

const userService = {
    collection: userCol,
    getAll: async () => {
        return await userCol.find({ status: 1 }).sort({ createdAt: -1 });
    },
    create: async (data) => {
        return await userCol.create(data);
    },
    remove: async (userId) => {
        return await userCol.findByIdAndUpdate(userId, { status: 0 });
    },
    checkUserStatus: async (email) => {
        const user = await userCol.findOne({ email: email });
        return user.status == 1 ? true : false;
    },
    edit: async (data) => {
        const id = data._id;
        delete data._id;

        if (data.role) {
            const role = data.role;
            data.role = role === '1' ? 'admin' : role === '2' ? 'superAdmin' : null;
        }

        let result = await userCol.findByIdAndUpdate(id, data);

        if (data.password) {
            result.password = data.password;
            await result.save();
        }

        return result;
    },
};

module.exports = userService;
