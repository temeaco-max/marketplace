const express = require('express');
const router = express.Router();

// Mock database for demonstration purposes
let products = []; // Replace with your actual database calls

// GET all products with pagination and filtering
router.get('/', (req, res) => {
    const { page = 1, limit = 10, name, category } = req.query;
    let filteredProducts = products;

    if (name) {
        filteredProducts = filteredProducts.filter(p => p.name.includes(name));
    }
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const resultProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
        total: filteredProducts.length,
        page,
        limit,
        products: resultProducts
    });
});

// GET product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// POST create product (seller only)
router.post('/', (req, res) => {
    const newProduct = { id: products.length + 1, ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    Object.assign(product, req.body);
    res.json(product);
});

// DELETE product
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found');
    products.splice(productIndex, 1);
    res.status(204).send();
});

module.exports = router;