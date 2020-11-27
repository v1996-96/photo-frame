const express = require('express');
const { pathOr, pick } = require('ramda');
const { nanoid } = require('nanoid');
const router = express.Router();
const apiService = require('../services/api');
const settingsService = require('../services/settings');

const appName = 'gallery';
let isLoadingPreviews = false;

async function loadPhotoPreviews() {
    isLoadingPreviews = true;

    const settings = await settingsService.read();
    const { selectedPaths = {} } = settings[appName] || {};

    const imagesBySelectedPaths = {};
    let images = {};

    for (const accountId of Object.keys(selectedPaths)) {
        const account = settings.accounts.find((account) => account.accountId === accountId);

        if (!account) {
            continue;
        }

        const token = account.credentials.accessToken;
        imagesBySelectedPaths[accountId] = {};

        for (const path of selectedPaths[accountId]) {
            const response = await apiService.requestDiskMeta({
                token,
                params: {
                    path,
                    limit: 10000,
                    offset: 0,
                    preview_crop: true,
                    preview_size: 'XXL',
                },
            });

            const files = pathOr([], ['data', 'embedded', 'items'], response);
            const filteredFiles = files.filter(({ mediaType }) => mediaType === 'image');
            const imagesMap = filteredFiles.reduce((acc, file) => {
                const imageId = nanoid();
                return { ...acc, [imageId]: { ...file, accountId, imageId } };
            }, {});

            imagesBySelectedPaths[accountId][path] = {
                createdAt: new Date().getTime(),
                imagesIds: Object.keys(imagesMap),
            };

            images = { ...images, ...imagesMap };
        }
    }

    await settingsService.write({
        ...settings,
        [appName]: {
            ...settings[appName],
            imagesBySelectedPaths,
            images,
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
        const { images = {} } = settings[appName] || {};

        res.json({ result: { images: Object.values(images) } });
    } catch (error) {
        next(error);
    }
});

router.get('/previews/image', async (req, res, next) => {
    try {
        const imageId = req.query.imageId;
        const accountId = req.query.accountId;

        const settings = await settingsService.read();
        const account = settings.accounts.find((account) => account.accountId === accountId);
        const images = settings[appName].images || {};

        if (!account) {
            throw new Error('Неизвестный пользователь');
        }

        const image = images[imageId];

        if (!image) {
            throw new Error('Неизвестная картинка');
        }

        const token = account.credentials.accessToken;
        const response = await apiService.requestImage({ url: image.preview, token });

        const imageBuffer = Buffer.from(response.data, 'binary');

        const headers = pick(
            ['content-type', 'content-length', 'cache-control', 'date', 'expires', 'last-modified'],
            response.headers,
        );

        res.writeHead(200, headers);

        res.end(imageBuffer);
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
});

module.exports = router;
