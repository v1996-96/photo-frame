const path = require('path');
const { SettingsAdapter } = require('../utils/settings-adapter');

const settingsFilePath = path.join(process.cwd(), process.env.SETTINGS_PATH, 'settings.json');

const defaultSettings = {
    accounts: [],
    gallery: {},
};

module.exports = new SettingsAdapter(settingsFilePath, defaultSettings);
