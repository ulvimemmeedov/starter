const fs = require('fs');
const path = require('path');

const Storage = {
    saveFile(file) {
        return new Promise((resolve, reject) => {
            const { base64, name } = file;

            const base64String = base64.split(';base64,').pop();

            if (!fs.existsSync(path.join(__dirname, '../public/uploads'))) {
                fs.mkdirSync(path.join(__dirname, '../public/uploads'));
            }

            fs.writeFile(
                path.join(__dirname, '../public/uploads/') + name,
                base64String,
                { encoding: 'base64' },
                function (err) {
                    if (err) {
                        return reject(err);
                    }
                    const url = path.join(__dirname, '../public/uploads/') + name;
                    return resolve({ success: true, url: url.split('public').pop() });
                }
            );
        });
    },
    deleteFile(filePath) {
        try {
            const result = fs.unlinkSync(path.join(__dirname, `../public${filePath}`));
            return result;
        } catch (err) {
            throw err;
        }
    },
};

module.exports = Storage;
