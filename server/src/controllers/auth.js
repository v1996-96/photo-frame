const express = require('express');
const router = express.Router();
const apiService = require('../services/yandex-api');
const { Account } = require('../models/account');

let localDeviceCode;

// Запрашиваем и выводим коды
router.post('/code', async (req, res, next) => {
    try {
        const response = await apiService.requestAuthCodes();
        const { deviceCode, expiresIn, interval, userCode, verificationUrl } = response.data;

        localDeviceCode = deviceCode;
        res.json({
            result: {
                interval,
                expiresAt: new Date().getTime() + expiresIn * 1000,
                userCode,
                verificationUrl,
            },
        });
    } catch (error) {
        next(error);
    }
});

// Периодически запрашиваем токен
router.post('/check', async (req, res, next) => {
    try {
        if (!localDeviceCode) {
            throw new Error('Не запрошен код подтверждения');
        }

        try {
            const tokenResponse = await apiService.requestAuthToken(localDeviceCode);
            const userResponse = await apiService.requestUserInfo(tokenResponse.data.accessToken);

            const newAccount = new Account({
                ...userResponse.data,
                credentials: tokenResponse.data,
                avatarUrl: `https://avatars.yandex.net/get-yapic/${userResponse.data.defaultAvatarId}/islands-retina-50`,
            });

            await newAccount.save();

            localDeviceCode = null;
            res.json({ result: { success: true } });
        } catch (error) {
            res.json({ result: { success: false } });
        }
    } catch (error) {
        next(error);
    }
});

// Информация об авторизованных учетках
router.get('/accounts', async (req, res, next) => {
    try {
        const accounts = await Account.find({}).lean();

        res.json({ result: accounts });
    } catch (error) {
        next(error);
    }
});

// Выйти из профиля
router.post('/logout', async (req, res, next) => {
    try {
        await Account.remove({ _id: req.body._id });

        res.json({ result: { success: true } });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
