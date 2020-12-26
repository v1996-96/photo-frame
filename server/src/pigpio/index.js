const { Gpio } = process.env.NODE_ENV !== 'production' ? require('pigpio-mock') : require('pigpio');
const { clamp } = require('../utils');

const RANGE = 1024;
const backlight = new Gpio(18, { mode: Gpio.OUTPUT });

// Set defaults
backlight.pwmFrequency(1000).pwmRange(RANGE);

module.exports = {
    MIN_BACKLIGHT: 0,
    MAX_BACKLIGHT: RANGE,

    setValue: (value) => {
        backlight.pwmWrite(clamp(value, 0, RANGE));
    },
};
