const fs = require('fs');
const path = require('path');
const errorPath = '../../../error_logs';

module.exports = function catchError(e, url = '') {
    console.log(`============================== ERROR ==============================
        url: '${url}'
       - Error:
          ${e}
      =======================================================================`);

    const nd = new Date();
    const y = nd.getFullYear();
    const m = nd.getMonth() + 1;
    const d = nd.getDate();
    const h = nd.getHours();
    const mm = nd.getMinutes();
    const s = nd.getSeconds();
    if (!fs.existsSync(path.resolve(__dirname, errorPath))) {
        fs.mkdirSync(path.resolve(__dirname, errorPath));
    }
    if (!fs.existsSync(path.resolve(__dirname, errorPath, `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`))) {
        fs.mkdirSync(path.resolve(__dirname, errorPath, `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`));
    }
    fs.writeFileSync(
        path.resolve(
            __dirname,
            errorPath,
            `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`,
            `log-${h < 10 ? `0${h}` : h}-${mm < 10 ? `0${mm}` : mm}-${s < 10 ? `0${s}` : s}-${Math.round(
                Math.random() * 1e9
            )}`
        ),
        `============================== ERROR ==============================
        url: '${url}'
  - Error:
    ${e}
  =======================================================================`
    );
};
