const mongoose = require('mongoose');

const connectDatabase = (mongoURI) => {
    mongoose.set('strictQuery', false);

    mongoose
        .connect(mongoURI)
        .then(() => {
            console.log('MongoDb Connection Successful');
            return 1;
        })
        .catch((err) => {
            console.error(err);
            return 0;
        });
};

module.exports = connectDatabase;
