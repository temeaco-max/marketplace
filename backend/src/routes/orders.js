const express = require('express');
const router = express.Router();

// Mock database for demonstration
const orders = {};
let currentId = 1;

// POST Create Order
router.post('/', (req, res) => {
    const { userId, items } = req.body;
    const newOrder = { id: currentId++, userId, items, status: 'pending', createdAt: new Date() };
    orders[newOrder.id] = newOrder;
    res.status(201).json(newOrder);
});

// GET User Orders
router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    const userOrders = Object.values(orders).filter(order => order.userId === userId);
    res.json(userOrders);
});

// GET Order Details
router.get('/:id', (req, res) => {
    const orderId = parseInt(req.params.id, 10);
    const order = orders[orderId];
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
});

// PUT Update Order Status
router.put('/:id/status', (req, res) => {
    const orderId = parseInt(req.params.id, 10);
    const { status } = req.body;
    const order = orders[orderId];
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    order.status = status;
    res.json(order);
});

module.exports = router;