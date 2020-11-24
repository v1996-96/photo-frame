const express = require('express');
const router = express.Router();
const apiService = require('../services/api');
const settingsService = require('../services/settings');

// Запрашиваем и выводим коды
router.get('/structure', async (req, res, next) => {
    try {
        const settings = await settingsService.readSettings();

        const token = settings.accounts[0].credentials.accessToken;

        const response = await apiService.requestDiskMeta({
            token,
            params: {
                path: '/',
            },
        });

        res.json({ result: response.data });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
