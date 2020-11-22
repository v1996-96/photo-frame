const path = require('path');
const fs = require('fs-extra');
const R = require('ramda');

const settingsDir = path.join(process.cwd(), process.env.SETTINGS_PATH);
const settingsFile = path.join(settingsDir, 'settings.json');

const defaultSettings = {
    accounts: [],
    apps: {},
};

const readSettings = async () => {
    const dirExists = await fs.pathExists(settingsDir);
    const fileExists = await fs.pathExists(settingsFile);

    if (!dirExists) {
        await fs.mkdir(settingsDir);
    }

    if (!fileExists) {
        await fs.writeJson(settingsFile, defaultSettings);
    }

    return fs.readJson(settingsFile);
};

const writeSettings = async (settings, overwrite = false) => {
    let newSettings = settings;

    if (!overwrite) {
        const currentSettings = await readSettings();
        newSettings = R.mergeDeepRight(currentSettings, settings);
    }

    return fs.writeJSON(settingsFile, newSettings);
};

module.exports = {
    readSettings,
    writeSettings,
};
