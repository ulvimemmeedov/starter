const catchErrors = require('../errors/catchErrors');
const CustomError = require('../errors/CustomError');

var exec = require('child_process').exec;

function execute(command) {
    return new Promise((resolve, reject) => {
        exec(command, function (error, stdout, stderr) {
            if (error) {
                catchErrors(error);
                return reject(new CustomError('Command exec falied', 500));
            }
            return resolve(stderr);
        });
    });
}

module.exports = execute;
