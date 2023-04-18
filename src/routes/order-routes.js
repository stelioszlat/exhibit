const express = require('express');

const orderController = require('../controllers/order-controller')

const router = express.Router();

// /api/orders
router.post('', orderController.createOrder);
router.get('/:orderId', orderController.getOrderById);
router.get('/:orderId/link', orderController.getOrderLinkById);
router.put('/:orderId', orderController.updateOrderById);
router.delete('/:orderId', orderController.deleteOrderById);

module.exports = router;