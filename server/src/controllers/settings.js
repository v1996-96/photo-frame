const express = require('express');
const router = express.Router();
const { loadSettiingsLean } = require('../models/settings');
const {} = require('../pigpio');

// Получить текущие настройки
router.post('/get', async (req, res, next) => {
    try {
        const settings = await loadSettiingsLean();

        res.json({ result: settings });
    } catch (error) {
        next(error);
    }
});

// Обновить настройки
router.post('/set', async (req, res, next) => {
    try {
        if (req.body.backlight) {
            setBacklight(req.body.backlight.value);
        }

        const newSettings = await loadSettiingsLean(req.body);

        res.json({ result: newSettings });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
