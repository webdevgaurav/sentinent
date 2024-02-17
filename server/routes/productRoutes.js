const express = require('express');
const router = express.Router();

const createProduct = require('../api/products/createProduct');
const getProducts = require('../api/products/getProducts');

router.get('/get/:id', getProducts.getProduct);
router.get('/get', getProducts.getProducts);
router.post('/create', createProduct.createProduct);
router.put('/create/:productId', createProduct.updateProduct);

module.exports = router;
