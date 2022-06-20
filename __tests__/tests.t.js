import request from 'supertest';
import app from '../app.js';

let nadal = Object({
  "firstname": "Novak",
  "lastname": "Djokovic",
  "shortname": "N.DJO",
  "sex": "M",
  "country": {
      "picture": "https://data.latelier.co/training/tennis_stats/resources/Serbie.png",
      "code": "SRB"
  },
  "picture": "https://data.latelier.co/training/tennis_stats/resources/Djokovic.png",
  "data": {
      "rank": 2,
      "points": 2542,
      "weight": 80000,
      "height": 188,
      "age": 31,
      "last": [
          1,
          1,
          1,
          1,
          1
      ]
  }
})

describe('Unit tests', function () {

  test('response to /players', async () => {
    const res = await request(app).get('/players');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('bad request to /players/:id', async () => {
    const res = await request(app).get('/players/notanumber');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400)
  });

  test('not found response to /players/:id', async () => {
    const res = await request(app).get('/players/1');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404)
  });

  test('found response to /players/:id', async () => {
    const res = await request(app).get('/players/95');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200)
  });

  test('response to /stats', async () => {
    const res = await request(app).get('/stats');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200)
  });

  test('post new valid player', async () => {
    const res = await (await request(app).post('/players').send(nadal));
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200)
  });

  test('post invalid player (missing field)', async () => {
    delete nadal.sex;
    const res = await (await request(app).post('/players').send(nadal));
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400)
  });

  test('post invalid player (includes id)', async () => {
    nadal.id = 42;
    const res = await (await request(app).post('/players').send(nadal));
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400)
  });

  test('patch player bad id', async () => {
    const res = await (await request(app).patch('/players/notanumber').send(nadal));
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400)
  });

  test('patch player not found', async () => {
    const res = await request(app).patch('/players/1');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404)
  });

  test('patch invalid player (includes id)', async () => {
    nadal.id = 42;
    const res = await (await request(app).patch('/players/95').send(nadal));
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400)
  });

  test('patch valid player', async () => {
    delete nadal.id;
    const res = await (await request(app).patch('/players/95').send(nadal));
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200)
  });

  test('delete player bad id', async () => {
    const res = await (await request(app).delete('/players/notanumber'));
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400)
  });

  test('delete player non-existant id)', async () => {
    const res = await (await request(app).delete('/players/42'));
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404)
  });

  test('delete player with existing id)', async () => {
    const res = await (await request(app).delete('/players/103'));
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200)
  });

});