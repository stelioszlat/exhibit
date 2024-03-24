const Order = require('../models/Order');
const Vendor = require('../models/Vendor');
const Catalog = require('../models/Catalog');
const mongoose = require('mongoose');

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
    const { vendor, catalog, creator, items } = req.body;

    try {

        const orderVendor = await Vendor.findOne({
            name: vendor 
        });

        if (!orderVendor) {
            return res.status(409).json({ message: 'Could not find a vendor for this order' });
        }

        const orderCatalog = await Catalog.findOne({
            name: catalog
        });

        if (!orderCatalog) {
            return res.status(409).json({ message: 'Could not find a catalog for this order' });
        }

        items.forEach(item => {
            if (!mongoose.Types.ObjectId.isValid(item._id)) {
                return res.status(409).json({ message: 'Could not find items' });
            }
        })
        const newOrder = await Order.create({
            vendor: mongoose.Types.ObjectId(orderVendor._id),
            catalog: mongoose.Types.ObjectId(orderCatalog._id), 
            creator: creator,
            items: items.map(item => { return { _id: mongoose.Types.ObjectId(item._id), orderQuantity: item.orderQuantity }}),
        });

        if (!newOrder) {
            return res.status(400).res({ message: 'Could not place order'});
        }

        res.status(201).json({ order: newOrder });
    } catch (err) {
        return next(err);
    }
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