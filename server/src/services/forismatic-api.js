const axios = require('axios');
const qs = require('qs');
const { FORISMATIC_HOST } = require('../config');

const requestQuote = () => {
    return axios.post(
        FORISMATIC_HOST,
        qs.stringify({
            method: 'getQuote',
            format: 'json',
            lang: 'ru',
        }),
    );
};

module.exports = {
    requestQuote,
};
