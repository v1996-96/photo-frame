'use strict';

function Gpio(pin, options) {
    this.gpio = pin;
    options = options || {};

    this.digitalValue = 0;
    this.pwmValue = 0;
    this.frequency = 31;
    this.pwmRange = 0;

    console.log(`[GPIO ${this.gpio} / constructor] Initializing...`);

    if (typeof options.mode === 'number') {
        this.mode = options.mode;
        console.log(`[GPIO ${this.gpio} / constructor] Setting mode = ${options.mode}`);
    }

    if (typeof options.pullUpDown === 'number') {
        this.pullUpDown = options.pullUpDown;
        console.log(`[GPIO ${this.gpio} / constructor] Setting pullUpDown = ${options.pullUpDown}`);
    }

    if (typeof options.edge === 'number') {
        this.edge = options.edge;
        console.log(`[GPIO ${this.gpio} / constructor] Setting edge = ${options.edge}`);
    }

    if (typeof options.alert === 'boolean' && options.alert) {
        this.alert = options.alert;
        console.log(`[GPIO ${this.gpio} / constructor] Setting alert = ${options.alert}`);
    }

    this.mode = function (mode) {
        console.log(`[GPIO ${this.gpio} / mode] Setting mode = ${mode}`);
        this.mode = mode;
        return this;
    };

    this.getMode = function () {
        console.log(`[GPIO ${this.gpio} / getMode] Getting mode = ${this.mode}`);
        return this.mode;
    };

    this.pullUpDown = function (pud) {
        console.log(`[GPIO ${this.gpio} / pullUpDown] Setting pullUpDown = ${pud}`);
        this.pullUpDown = pud;
        return this;
    };

    this.digitalRead = function () {
        console.log(
            `[GPIO ${this.gpio} / digitalRead] Getting digitalValue = ${this.digitalValue}`,
        );
        return this.digitalValue;
    };

    this.digitalWrite = function (level) {
        console.log(`[GPIO ${this.gpio} / digitalWrite] Setting value = ${level}`);
        this.digitalValue = level;
        return this;
    };

    this.trigger = function (pulseLen, level) {
        console.log(
            `[GPIO ${this.gpio} / trigger] Triggering, pulseLen: ${pulseLen}, level: ${level}`,
        );
        return this;
    };

    this.pwmWrite = function (dutyCycle) {
        console.log(`[GPIO ${this.gpio} / pwmWrite-analogWrite] Setting dutyCycle = ${dutyCycle}`);
        this.pwmValue = dutyCycle;
        return this;
    };

    this.hardwarePwmWrite = function (frequency, dutyCycle) {
        console.log(
            `[GPIO ${this.gpio} / hardwarePwmWrite] Setting dutyCycle = ${dutyCycle}, frequency = ${frequency}`,
        );
        this.pwmValue = dutyCycle;
        this.frequency = frequency;
        return this;
    };

    this.getPwmDutyCycle = function () {
        console.log(`[GPIO ${this.gpio} / getPwmDutyCycle] Getting dutyCycle = ${this.pwmValue}`);
        return this.pwmValue;
    };

    this.pwmRange = function (range) {
        console.log(`[GPIO ${this.gpio} / pwmRange] Setting pwmRange = ${range}`);
        this.pwmRange = range;
        return this;
    };

    this.getPwmRange = function () {
        console.log(`[GPIO ${this.gpio} / getPwmRange] Getting pwmRange = ${this.pwmRange}`);
        return this.pwmRange;
    };

    this.getPwmRealRange = function () {
        console.log(`[GPIO ${this.gpio} / getRealPwmRange] Getting pwmRange = ${this.pwmRange}`);
        return this;
    };

    this.pwmFrequency = function (frequency) {
        console.log(`[GPIO ${this.gpio} / pwmFrequency] Setting frequency = ${frequency}`);
        this.frequency = frequency;
        return this;
    };

    this.getPwmFrequency = function () {
        console.log(`[GPIO ${this.gpio} / getPwmFrequency] Getting frequency = ${this.frequency}`);
        return this.frequency;
    };

    this.servoWrite = function (pulseWidth) {
        console.log(`[GPIO ${this.gpio} / servoWrite] METHOD NOT IMPLEMENTED`);
        return this;
    };

    this.getServoPulseWidth = function () {
        console.log(`[GPIO ${this.gpio} / getServoPulseWidth] METHOD NOT IMPLEMENTED`);
        return null;
    };
}

Gpio.prototype.analogWrite = Gpio.prototype.pwmWrite;

Gpio.INPUT = 0; // PI_INPUT
Gpio.OUTPUT = 1; //PI_OUTPUT;
Gpio.ALT0 = 4; // PI_ALT0;
Gpio.ALT1 = 5; // PI_ALT1;
Gpio.ALT2 = 6; // PI_ALT2;
Gpio.ALT3 = 7; // PI_ALT3;
Gpio.ALT4 = 3; // PI_ALT4;
Gpio.ALT5 = 2; // PI_ALT5;

/* pud */
Gpio.PUD_OFF = 0; // PI_PUD_OFF;
Gpio.PUD_DOWN = 1; // PI_PUD_DOWN;
Gpio.PUD_UP = 2; // PI_PUD_UP;

/* isr */
Gpio.RISING_EDGE = 0; // RISING_EDGE;
Gpio.FALLING_EDGE = 1; // FALLING_EDGE;
Gpio.EITHER_EDGE = 2; // EITHER_EDGE;

/* timeout */
Gpio.TIMEOUT = 2; // PI_TIMEOUT;

/* gpio numbers */
Gpio.MIN_GPIO = 0; // PI_MIN_GPIO;
Gpio.MAX_GPIO = 53; // PI_MAX_GPIO;
Gpio.MAX_USER_GPIO = 31; // PI_MAX_USER_GPIO;

module.exports = { Gpio };
