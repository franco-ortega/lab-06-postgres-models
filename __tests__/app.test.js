const fs = require('fs');
const request = require('supertest');
const app = require('../app.js');
const pool = require('../lib/utils/pool.js');
const Map = require('../lib/models/maps');

describe('app.js endpoints', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });


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
      });
    expect(resposne.body).toEqual({
      id: '1',
      title: 'four',
      terrain: 'swamp',
      price: '100'
    });
  });

  it('finds all maps via GET', async() => {
    const map1 = await Map.insert({
      title: 'five',
      terrain: 'desert',
      price: '55'
    });
    
    const map2 = await Map.insert({
      title: 'six',
      terrain: 'plains',
      price: '65'
    });

    const response = await request(app)
      .get('/map');
    
    expect(response.body).toEqual([map1, map2]);
  });

  it('gets one map by ID via GET', async() => {
    const map = await Map.insert({
      title: 'seven',
      terrain: 'space',
      price: '99'
    });
    const response = await request(app)
      .get(`/map/${map.id}`);

    expect(response.body).toEqual(map);
  });

  it('updates one map by ID via PUT', async() => {
    const map = await Map.insert({
      title: 'seven',
      terrain: 'space',
      price: '99'
    });
    const response = await request(app)
      .put(`/map/${map.id}`)
      .send({
        title: 'seven stars',
        terrain: 'outer space',
        price: '99'
      });

    expect(response.body).toEqual({
      ...map,
      title: 'seven stars',
      terrain: 'outer space',
      price: '99'
    });
  });

});



