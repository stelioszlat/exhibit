const Order = require('../models/Order');

const ORDERS_PER_PAGE = 10;

exports.getOrders = async (req, res, next) => {
    const page = +req.query.page || 1;

    try {
        const ordersCounted = await Order.countDocuments();

        const orders = await Order.find()
            .skip((page - 1) * ORDERS_PER_PAGE)
            .limit(ORDERS_PER_PAGE)
            .populate('exhibits');

        return res.status(200).json({ 
            orders, 
            hasNextPage: ORDERS_PER_PAGE * page < ordersCounted.valueOf(),
            lastPage: Math.ceil(ordersCounted.valueOf() / ORDERS_PER_PAGE)
        });
    } catch (err) {
        return next(err);
    } 
}

exports.createOrder = async (req, res, next) => {
    
}

exports.getOrderById = async (req, res, next) => {
    const orderId = req.params.orderId;

    try {
        const order = await Order.findById(orderId).populate('exhibits');

        if (!order) {
            return res.status(404).json({ message: "Could not find order." });
        } 

        res.status(200).json({ order });
    } catch (err) {
        return next(err);
    }
}

exports.getOrderLinkById = async (req, res, next) => {
    const orderId = req.params.orderId;

    try {
        const order = await Order.findById(orderId).populate('exhibits');

        if (!order) {
            return res.status(404).json({ message: "Could not find order." });
        }

        const link = "http://localhost:8080/order/" + order.orderId;

        res.status(200).json({ link });
    } catch (err) {
        return next(err);
    }
}

exports.updateOrderById = async (req, res, next) => {
    const orderId = req.params.orderId;
}

exports.deleteOrderById = async (req, res, next) => {
    const orderId = req.params.orderId;
}

exports.hasValidId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.orderId)) {
        return res.status(404).json({ message: 'Could not find order' });
    }

    next();
}