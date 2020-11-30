const express = require('express');
const router = express.Router();
const apiService = require('../services/forismatic-api');

router.get('/get', async (req, res, next) => {
    try {
        const response = await apiService.requestQuote();

        res.json({ result: response.data });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
