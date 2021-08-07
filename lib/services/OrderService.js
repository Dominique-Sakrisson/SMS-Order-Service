const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio.js');

module.exports = class OrderService {
  static async create({ quantity }){
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );
    return await Order.insert({ quantity });
  }
  static async getAll(){
    return await Order.getOrders(); 
  }
  static async getById(id){
    return await Order.getOrderById(id);
  }
  static async updateOrder(id, quantity){
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Updating the #${id} order quantity to ${ quantity.quantity }`
    );
    return await Order.updateOrder(id, quantity);
  }
  static async deleteOrder(id){
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Removed order #${id} `
    );
    return await Order.deleteOrder(id);
  }
};
