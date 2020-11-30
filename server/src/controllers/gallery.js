const express = require('express');
const { pathOr, pick } = require('ramda');
const router = express.Router();
const apiService = require('../services/yandex-api');
const { Account } = require('../models/account');
const { DiskPath } = require('../models/disk-path');
const { DiskImage } = require('../models/disk-image');

let isLoadingPreviews = false;

async function loadPhotoPreviews() {
    isLoadingPreviews = true;

    await DiskImage.deleteMany({});

    const selectedPaths = await DiskPath.find({}).populate('account').exec();

    for (const selectedPath of selectedPaths) {
        const path = selectedPath.path;
        const token = selectedPath.account.credentials.accessToken;

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

        selectedPath.updatedAt = new Date();
        const files = pathOr([], ['data', 'embedded', 'items'], response);
        const filteredFiles = files.filter(({ mediaType }) => mediaType === 'image');
        const connectedFiles = filteredFiles.map((file) => ({
            ...file,
            diskPath: selectedPath._id,
            account: selectedPath.account._id,
        }));

        await DiskImage.insertMany(connectedFiles);
        await selectedPath.save();
    }

    isLoadingPreviews = false;
}

// Запрашиваем и выводим коды
router.get('/structure', async (req, res, next) => {
    try {
        const path = req.query.path || '/';
        const limit = req.query.limit || 100;
        const offset = req.query.offset || 0;

        const account = await Account.findById(req.query.accountId).lean();

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
        const selectedPaths = await DiskPath.find({}).lean();

        res.json({ result: { selectedPaths } });
    } catch (error) {
        next(error);
    }
});

router.post('/selected/set', async (req, res, next) => {
    try {
        await DiskPath.deleteMany({});
        await DiskPath.insertMany(req.body.selectedPaths);

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
        const images = await DiskImage.find({}).lean();

        res.json({ result: { images } });
    } catch (error) {
        next(error);
    }
});

router.get('/previews/image', async (req, res, next) => {
    try {
        const imageId = req.query.imageId;
        const accountId = req.query.accountId;

        const account = await Account.findById(accountId).lean();

        if (!account) {
            throw new Error('Неизвестный пользователь');
        }

        const image = await DiskImage.findById(imageId).lean();

        if (!image) {
            throw new Error('Неизвестная картинка');
        }

        const token = account.credentials.accessToken;
        const response = await apiService.requestImage({ url: image.preview, token });

        const imageBuffer = Buffer.from(response.data, 'binary');

        const headers = pick(
            ['content-type', 'content-length', 'cache-control', 'date', 'last-modified'],
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
