import request from 'supertest';
import data from '../../store/reset.json';
import app from '../server';

describe('GET / - a simple api endpoint', () => {
  it('gets the initial route message', async () => {
    const result = await request(app).get('/');
    const { text, status } = result;

    expect(text).toEqual('Hello Buba3!');
    expect(status).toEqual(200);
  });
});

describe('GET /puppies  - list of store puppies', () => {
  it('gets them all damnit', async () => {
    const { status, body } = await request(app).get('/puppies');
    expect(status).toEqual(200);
    expect(body).toEqual(data.puppies);
  });
});
