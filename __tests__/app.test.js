//const fs = require('fs');
const request = require('supertest');
const app = require('../app.js');
//const pool = require('../lib/utils/pool.js');

describe('app.js endpoints', () => {

  it('sample test to make sure the wiring is connected', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.text).toEqual('It is mapping time!!');
      });

  });
});

