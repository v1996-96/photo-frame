require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { requestAuthCodes, requestAuthToken } = require('./disk-api');

let localDeviceCode = null;

const sendError = (res, message) => res.status(400).json({ error: { message: message } });
const sendSuccess = (res, data) => res.status(200).json({ result: data });

// Запрашиваем и выводим коды
app.post('/auth', async (req, res) => {
    try {
        const result = await requestAuthCodes();
        const { device_code, expires_in, interval, user_code, verification_url } = result.data;

        localDeviceCode = device_code;
        sendSuccess(res, { expires_in, interval, user_code, verification_url });
    } catch (error) {
        sendError(res, error.message);
    }
});

// Периодически запрашиваем токен
app.post('/auth/check', async (req, res) => {
    try {
        if (!localDeviceCode) {
            throw new Error('Не запрошен код подтверждения');
        }

        const result = await requestAuthToken(localDeviceCode);

        localDeviceCode = null;

        sendSuccess(res, result.data);
    } catch (error) {
        sendError(res, error.message);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
