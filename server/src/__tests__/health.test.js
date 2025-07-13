const request = require('supertest');
const express = require('express');
const healthRouter = require('../routes/health');

describe('Health Check Endpoint', () => {
  let app;
  beforeAll(() => {
    app = express();
    app.use('/api', healthRouter);
  });

  it('should return status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
