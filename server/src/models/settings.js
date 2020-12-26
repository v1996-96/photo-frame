const { Schema, model } = require('mongoose');
const { BACKLIGHT_CONFIG } = require('../config');
const { MAX_BACKLIGHT } = require('../pigpio');

const SettingsNamespace = 'Settings';

const SettingsSchema = new Schema({
    backlight: {
        mode: { type: String, default: BACKLIGHT_CONFIG.MANUAL },
        value: { type: Number, default: MAX_BACKLIGHT },
    },
});

module.exports = {
    SettingsNamespace,
    SettingsSchema,
    Settings: model(SettingsNamespace, SettingsSchema),

    loadSettiingsLean: (update = {}) => {
        return Settings.findOneAndUpdate({}, update, { upsert: true }).lean();
    },
};
