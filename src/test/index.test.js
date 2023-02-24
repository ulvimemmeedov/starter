require('dotenv').config();
const appMain = require('../index');
const supertest = require('supertest');
const requestMain = supertest(appMain);

describe('GET /', () => {
    it('should return a response', async () => {
        const response = await requestMain.get('/');
        expect(response.status).toBe(200);
    });
});
