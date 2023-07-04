import request from 'supertest';
import app from '../index';

describe('Get all records with a GET api/users request', () => {
  test('get an empty array with get /users request', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
