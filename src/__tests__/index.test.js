const app = require('../../app');
const request = require('supertest');

describe('cache api', () => {
  it("responds with 200 for get request with valid key", async () => {
    const res = await request(app).get('/cacheEntries/key9');
    expect(res.statusCode).toEqual(200);
  })
});