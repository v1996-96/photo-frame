const express = require('express');
const { pathOr } = require('ramda');
const router = express.Router();
const apiService = require('../services/api');
const settingsService = require('../services/settings');

const appName = 'gallery';
let isLoadingPreviews = false;

async function loadPhotoPreviews() {
    isLoadingPreviews = true;

    const settings = await settingsService.read();
    const { selectedPaths = {} } = settings[appName] || {};

    const collectedPreviews = {};

    for (const accountId of Object.keys(selectedPaths)) {
        const account = settings.accounts.find((account) => account.accountId === accountId);

        if (!account) {
            continue;
        }

        const token = account.credentials.accessToken;

        collectedPreviews[accountId] = {};

        for (const path of selectedPaths[accountId]) {
            const response = await apiService.requestDiskMeta({
                token,
                params: {
                    path,
                    limit: 10000,
                    offset: 0,
                    preview_crop: true,
                    preview_size: '1024x',
                },
            });

            const files = pathOr([], ['data', 'embedded', 'items'], response);

            collectedPreviews[accountId][path] = {
                createdAt: new Date().getTime(),
                files: files.filter(({ mediaType }) => mediaType === 'image'),
            };
        }
    }

    await settingsService.write({
        ...settings,
        [appName]: {
            ...settings[appName],
            previews: collectedPreviews,
        },
    });

    isLoadingPreviews = false;
}

// Запрашиваем и выводим коды
router.get('/structure', async (req, res, next) => {
    try {
        const accountId = req.query.accountId;
        const path = req.query.path || '/';
        const limit = req.query.limit || 100;
        const offset = req.query.offset || 0;

        const settings = await settingsService.read();
        const account = settings.accounts.find((account) => account.accountId === accountId);

        if (!account) {
            throw new Error('Неизвестный пользователь');
        }

        const token = account.credentials.accessToken;
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

router.post('/previews/load', (req, res) => {
    if (isLoadingPreviews) {
        res.json({ result: { isLoading: true } });
        return;
    }

    loadPhotoPreviews();

    res.json({ result: { success: true } });
});

router.get('/previews/list/get', async (req, res, next) => {
    try {
        const settings = await settingsService.read();
        const { previews = {} } = settings[appName] || {};

        const previewsList = Object.keys(previews).reduce((acc, accountId) => {
            const byPaths = Object.keys(previews[accountId]).reduce((acc, path) => {
                return acc.concat(previews[accountId][path].files);
            }, []);

            return acc.concat(byPaths);
        }, []);

        res.json({ result: { previewsList } });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
