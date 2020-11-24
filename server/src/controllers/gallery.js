const express = require('express');
const router = express.Router();
const apiService = require('../services/api');
const settingsService = require('../services/settings');

// Запрашиваем и выводим коды
router.get('/structure', async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const path = req.query.path || '/';
        const limit = req.query.limit || 100;
        const offset = req.query.offset || 0;

        const settings = await settingsService.readSettings();
        const user = settings.accounts.find((account) => account.userId === userId);

        if (!user) {
            throw new Error('Неизвестный пользователь');
        }

        const token = user.credentials.accessToken;
        const response = await apiService.requestDiskMeta({
            token,
            params: { path, limit, offset },
        });

        res.json({ result: response.data });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
