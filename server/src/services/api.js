const axios = require('axios');
const qs = require('qs');
const {
    CLIENT_ID,
    CLIENT_SECRET,
    DEVICE_ID,
    DEVICE_NAME,
    SCOPE,
    YANDEX_OAUTH_HOST,
    YANDEX_LOGIN_HOST,
} = require('../config');

const requestAuthCodes = () => {
    return axios.post(
        `${YANDEX_OAUTH_HOST}/device/code`,
        qs.stringify({
            client_id: CLIENT_ID,
            device_id: DEVICE_ID,
            device_name: DEVICE_NAME,
            scope: SCOPE,
        }),
    );
};

const requestAuthToken = (deviceCode) => {
    return axios.post(
        `${YANDEX_OAUTH_HOST}/token`,
        qs.stringify({
            grant_type: 'device_code',
            code: deviceCode,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }),
    );
};

const requestUserInfo = (token) => {
    return axios.get(`${YANDEX_LOGIN_HOST}/info`, {
        params: { format: 'json' },
        headers: { Authorization: `OAuth ${token}` },
    });
};

module.exports = {
    requestAuthCodes,
    requestAuthToken,
    requestUserInfo,
};
