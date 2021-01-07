const express = require('express');
const fg = require('fast-glob');
const { randomItem } = require('../utils');
const router = express.Router();

const PARTY_PATH = '../../public/party';
const SERVED_PATH = '/static/party';

router.get('/get', async (req, res, next) => {
    try {
        const result = await fg(`${PARTY_PATH}/**/*.gif`, { cwd: __dirname });

        const randomParrot = randomItem(result || []);

        if (!randomParrot) {
            res.json({ result: { parrotLink: null } });
        }

        const parrotLink = randomParrot.replace(PARTY_PATH, '');

        res.json({
            result: { parrotLink: `${SERVED_PATH}${parrotLink}` },
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
