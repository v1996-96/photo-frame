const express = require('express');
const { set } = require('ramda');
const router = express.Router();
const apiService = require('../services/api');
const settingsService = require('../services/settings');

const appName = 'gallery';

// Запрашиваем и выводим коды
router.get('/structure', async (req, res, next) => {
    try {
        const accountId = req.query.accountId;
        const path = req.query.path || '/';
        const limit = req.query.limit || 100;
        const offset = req.query.offset || 0;

        const settings = await settingsService.read();
        const user = settings.accounts.find((account) => account.accountId === accountId);

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

router.get('/selected/get', async (req, res, next) => {
    try {
        const settings = await settingsService.read();
        const { selectedPaths = {} } = settings[appName] || {};

        res.json({ result: { selectedPaths } });
    } catch (error) {
        next(error);
    }
});

router.post('/selected/set', async (req, res, next) => {
    try {
        const settings = await settingsService.read();
        const newSettings = {
            ...settings,
            [appName]: {
                ...settings[appName],
                selectedPaths: req.body.selectedPaths || {},
            },
        };

        await settingsService.write(newSettings);

        res.json({ result: { success: true } });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
