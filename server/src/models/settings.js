const { Schema, model } = require('mongoose');
const { BACKLIGHT_CONFIG } = require('../config');
const { MAX_BACKLIGHT } = require('../pigpio');

const SettingsNamespace = 'Settings';

const SettingsSchema = new Schema(
    {
        backlight: {
            mode: { type: String, default: BACKLIGHT_CONFIG.MANUAL },
            value: { type: Number, default: MAX_BACKLIGHT },
        },
    },
    { minimize: false },
);

const Settings = model(SettingsNamespace, SettingsSchema);

module.exports = {
    SettingsNamespace,
    SettingsSchema,
    Settings,

    loadSettiingsLean: (update = {}) => {
        return Settings.findOneAndUpdate({}, update, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }).lean();
    },
};
