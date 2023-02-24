const NodeCache = require('node-cache');
const appCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const cacheService = {
    appCache,
    get(key) {
        return appCache.get(key);
    },
    set(key, value) {
        return appCache.set(key, value);
    },
    exist(key) {
        return appCache.has(key);
    },
    delete(...keys) {
        return appCache.del(keys);
    },
};

module.exports = cacheService;
