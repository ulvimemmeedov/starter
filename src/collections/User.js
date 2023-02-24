const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide a Full name'],
    },
    userName: {
        type: String,
        required: [true, 'Please provide a User name'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Please provide a password'],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ['superAdmin', 'admin'],
        default: 'admin',
    },
    status: {
        type: Number,
        enum: [1, 0],
        default: 1,
    },
    resetPasswordToken: {
        type: String,
    },
    no: {
        type: Number,
    },
    resetPasswordExpire: {
        type: Date,
    },
});
UserSchema.methods.getTokenFromUserModel = function () {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
    const payload = {
        id: this.id,
        fullName: this.fullName,
        userName: this.userName,
        email: this.email,
        role: this.role,
        createdAt: this.createdAt,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });

    return token;
};

UserSchema.methods.getResetPasswordToken = function () {
    const randomHexString = crypto.randomBytes(15).toString('hex');

    const resetPasswordToken = crypto.createHash('SHA256').update(randomHexString).digest('hex');

    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE);

    return resetPasswordToken;
};

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);
