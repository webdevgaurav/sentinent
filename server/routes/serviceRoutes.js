const express = require('express');
const router = express.Router();

const uploadFile = require('../services/Upload');

router.post('/file/upload', uploadFile.upload);

module.exports = router;
