const raspi = require('raspi');
const pwm = require('raspi-pwm');

raspi.init(() => {
    console.log('raspi init');
    const lcd = new pwm.PWM({ pin: 'GPIO18', frequency: 1000 });
    lcd.write(0.5);
    lcd.write(1);
});
