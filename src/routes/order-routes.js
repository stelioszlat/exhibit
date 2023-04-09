const express = require('express');

const orderController = require('../controllers/order-controller')

const router = express.Router();

// /api/order
router.post('', orderController.createOrder);
router.get('/:orderId', orderController.getOrderById);
router.put('/:orderId', orderController.updateOrderById);
router.delete('/:orderId', orderController.deleteOrderById);

module.exports = router;