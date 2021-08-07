const { Router } = require('express');
const OrderService = require('../services/OrderService.js');

module.exports = Router()
  .post('/', async(req, res, next) => {
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch(error) {
      next(error);
    }
  })
  .get('/', async(req, res, next) => {
    try {
      const order = await OrderService.getAll();
      res.send(order);
    } catch(error) {
      next(error);
    }
  })
  .get('/:id', async(req, res, next) => {
    try {
      const order = await OrderService.getById(req.params.id);
      res.send(order);
    } catch(error) {
      next(error);
    }
  })
  .put('/:id', async(req, res, next) => {
    try {
      const order = await OrderService.updateOrder(req.params.id, req.body);
      res.send(order);
    } catch(error) {
      next(error);
    }
  })
  .delete('/:id', async(req, res, next) => {
    try {
      const order = await OrderService.deleteOrder(req.params.id);
      res.send(order);
    } catch(error) {
      next(error);
    }
  });
