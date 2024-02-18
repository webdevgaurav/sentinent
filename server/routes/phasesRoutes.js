const express = require('express');
const router = express.Router();

const createPhases = require('../api/phases/createPhases');
const getPhases = require('../api/phases/getPhases');

router.get('/get/:id', getPhases.getPhases);
router.get('/get', getPhases.getPhase);
router.post('/create', createPhases.createPhases);
router.put('/create/:phasesId', createPhases.updatePhases);

module.exports = router;
