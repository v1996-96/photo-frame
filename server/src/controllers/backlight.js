const express = require('express');
const router = express.Router();
const { Settings } = require('../models/settings');

router.post('/get', async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
});

router.post('/set', async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
});

module.exports = router;
