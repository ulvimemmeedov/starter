// Library import
const bcrypt = require('bcryptjs');
// Validation Class
const valdiationHelper = {
    comparePassword: (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword),
};

module.exports = valdiationHelper;
