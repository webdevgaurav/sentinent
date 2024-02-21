const express = require('express');
const router = express.Router();

const createProduct = require('../api/training/products/createProduct');
const getProducts = require('../api/training/products/getProducts');

const createPhases = require('../api/training/phases/createPhases');
const getPhases = require('../api/training/phases/getPhases');

const createModule = require('../api/training/module/createModule');
const getModule = require('../api/training/module/getModule');

router.get('/products/get/:id', getProducts.getProduct);
router.get('/products/get', getProducts.getProducts);
router.post('/products/create', createProduct.createProduct);
router.put('/products/create/:productId', createProduct.updateProduct);

router.get('/phases/get/:productId', getPhases.getPhases);
router.get('/phases/get', getPhases.getPhase);
router.post('/phases/create', createPhases.createPhases);
router.put('/phases/create/:phasesId', createPhases.updatePhases);

router.get('/module/get/:phasesId', getModule.getModules);
router.get('/module/get', getModule.getModule);
router.put('/module/create/:moduleId', createModule.updateModule);
router.post('/module/create', createModule.createModule);

module.exports = router;
