const axios = require('axios');
const axiosDefaults = require('axios/lib/defaults');
const qs = require('qs');
const camelcaseKeys = require('camelcase-keys');
const R = require('ramda');
const { SCOPE, YANDEX_OAUTH_HOST, YANDEX_LOGIN_HOST, YANDEX_CLOUD_HOST } = require('../config');
const { CLIENT_ID, CLIENT_SECRET, DEVICE_ID, DEVICE_NAME } = process.env;

const defaultOptions = {
    transformResponse: [
        ...axiosDefaults.transformResponse,
        (data) => (R.is(Object, data) && camelcaseKeys(data)) || data,
    ],
};

const getHeaders = (token) => ({
    Authorization: `OAuth ${token}`,
});

const requestAuthCodes = () => {
    return axios.post(
        `${YANDEX_OAUTH_HOST}/device/code`,
        qs.stringify({
            client_id: CLIENT_ID,
            device_id: DEVICE_ID,
            device_name: DEVICE_NAME,
            scope: SCOPE,
        }),
        defaultOptions,
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
        defaultOptions,
    );
};

const requestUserInfo = (token) => {
    return axios.get(`${YANDEX_LOGIN_HOST}/info`, {
        ...defaultOptions,
        params: { format: 'json' },
        headers: getHeaders(token),
    });
};

const requestDiskMeta = ({ params, token }) => {
    return axios.get(`${YANDEX_CLOUD_HOST}/disk/resources`, {
        ...defaultOptions,
        params,
        headers: getHeaders(token),
    });
};

module.exports = {
    requestAuthCodes,
    requestAuthToken,
    requestUserInfo,
    requestDiskMeta,
};
