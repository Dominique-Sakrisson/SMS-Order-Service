const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(res => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      });
  });
  it('ASYNC/AWAIT: creates a new order in our database and sends a text message', async() => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 5 });
    expect(res.body).toEqual({
      id: '2',
      quantity: 5,
    });
  });

  it('gets all orders in the database', () => {
    return request(app)
      .get('/api/v1/orders')
      .then(res => {
        expect(res.body).toEqual([{ id: '1', quantity: 10 }, { id: '2', quantity: 5 }]);
      });
  });

  it('gets specified order from the database', () => {
    return request(app)
      .get('/api/v1/orders/2')
      .then(res => {
        expect(res.body).toEqual({ id: '2', quantity: 5 });
      });
  });
  it('updates the chosen order quantity', () => {
    return request(app)
      .put('/api/v1/orders/2')
      .send({ quantity: 50 })
      .then(res => {
        expect(res.body).toEqual({ id: '2', quantity: 50 });
      });
  });
  it('deletes the chosen order', () => {
    return request(app)
      .delete('/api/v1/orders/1')
      .then(res => {
        expect(res.body).toEqual({ id: '1', quantity: 10 });
      });
  });

});
