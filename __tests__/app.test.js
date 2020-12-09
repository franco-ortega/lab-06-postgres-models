const fs = require('fs');
const request = require('supertest');
const app = require('../app.js');
const pool = require('../lib/utils/pool.js');

describe('app.js endpoints', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  })


  it('sample test to make sure the wiring is connected', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.text).toEqual('It is mapping time!!');
      });

  });

  it('creates a map via POST', async() => {
    const resposne = await request(app)
      .post('/map')
      .send({
        title: 'four',
        terrain: 'swamp',
        price: '100'
      })
    expect(resposne.body).toEqual({
      id: '1',
      title: 'four',
      terrain: 'swamp',
      price: '100'
    });
  });

});



