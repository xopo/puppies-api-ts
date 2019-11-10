import request from 'supertest';
import app from '../server';

const  data = require('../../store/reset.json');

describe('GET / - a simple api endpoint', () => {
  it('gets the initial route message', async () => {
    const result = await request(app).get('/');
    const { text, status } = result;

    expect(text).toEqual('Hello Buba3!');
    expect(status).toEqual(200);
  });
});

describe('GET /puppies  - list of puppies in the store', () => {
  it('gets all available puppies', async () => {
    const { status, body } = await request(app).get('/puppies');
    expect(status).toEqual(200);
    expect(body).toEqual(data.puppies);
  });
});

describe('GET /puppy/:id', () => {
  it('gets a puppy by id', async () => {
    const { status, body } = await request(app).get('/puppy/2');
    expect(status).toEqual(200);
    expect(body).toEqual(data.puppies[1]);
  });
});
