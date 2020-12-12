const raspi = require('raspi');
const board = require('raspi-board');
const pwm = require('raspi-pwm');

raspi.init(() => {
    console.log('raspi init', board.getPinNumber('GPIO18'));
    const lcd = new pwm.PWM({ pin: 1, frequency: 1000 });
    lcd.write(0.5);
    lcd.write(1);
});