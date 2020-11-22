const express = require('express');
const { nanoid } = require('nanoid');
const router = express.Router();
const apiService = require('../services/api');
const settingsService = require('../services/settings');

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

            const newAccount = {
                ...userResponse.data,
                userId: nanoid(),
                credentials: tokenResponse.data,
            };

            const { defaultAvatarId } = userResponse.data;
            newAccount.avatarUrl = `https://avatars.yandex.net/get-yapic/${defaultAvatarId}/islands-retina-50`;

            const settings = await settingsService.readSettings();
            await settingsService.writeSettings(
                { ...settings, accounts: [...settings.accounts, newAccount] },
                true,
            );

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
        const settings = await settingsService.readSettings();

        res.json({ result: settings.accounts });
    } catch (error) {
        next(error);
    }
});

// Выйти из профиля
router.post('/logout', async (req, res, next) => {
    try {
        const settings = await settingsService.readSettings();

        const newAccounts = settings.accounts.filter(({ userId }) => userId !== req.body.userId);
        await settingsService.writeSettings({ ...settings, accounts: newAccounts }, true);

        res.json({ result: { success: true } });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
