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
        const { device_code, expires_in, interval, user_code, verification_url } = response.data;

        localDeviceCode = device_code;
        res.json({
            result: {
                interval,
                expiresAt: new Date().getTime() + expires_in * 1000,
                userCode: user_code,
                verificationUrl: verification_url,
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
            const userResponse = await apiService.requestUserInfo(tokenResponse.data.access_token);

            const newAccount = {
                ...userResponse.data,
                app_id: nanoid(),
                credentials: tokenResponse.data,
            };

            const { default_avatar_id } = userResponse.data;
            newAccount.avatar_url = `https://avatars.yandex.net/get-yapic/${default_avatar_id}/islands-retina-50`;

            const settings = await settingsService.readSettings();
            await settingsService.writeSettings(
                {
                    ...settings,
                    accounts: [...settings.accounts, newAccount],
                },
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

        const newAccounts = settings.accounts.filter(({ app_id }) => app_id !== req.body.app_id);
        await settingsService.writeSettings({ ...settings, accounts: newAccounts }, true);

        res.json({ result: { success: true } });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
