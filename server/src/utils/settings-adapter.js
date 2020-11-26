const R = require('ramda');
const fs = require('fs-extra');

class SettingsAdapter {
    constructor(filePath, defaults = {}) {
        this.filePath = filePath;
        this.defaults = defaults;
    }

    async read() {
        const fileExists = await fs.pathExists(this.filePath);

        await fs.ensureFile(this.filePath);

        if (!fileExists) {
            await fs.writeJson(this.filePath, this.defaults);
        }

        return fs.readJson(this.filePath);
    }

    async write(data, overwrite = false) {
        let newData = data;

        if (!overwrite) {
            const currentData = await this.read();
            newData = R.mergeDeepRight(currentData, data);
        }

        return fs.writeJSON(this.filePath, newData);
    }
}

module.exports = {
    SettingsAdapter,
};
