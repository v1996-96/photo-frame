const { Schema, Types, model } = require('mongoose');
const { AccountNamespace } = require('./account');
const { DiskPathNamespace } = require('./disk-path');

const DiskImageNamespace = 'DiskImage';

const DiskImageSchema = new Schema({
    name: String,
    preview: String,
    created: String,
    modified: String,
    path: String,
    type: String,
    mimeType: String,
    mediaType: String,
    size: String,
    diskPath: {
        type: Types.ObjectId,
        ref: DiskPathNamespace,
    },
    account: {
        type: Types.ObjectId,
        ref: AccountNamespace,
    },
});

module.exports = {
    DiskImageNamespace,
    DiskImageSchema,
    DiskImage: model(DiskImageNamespace, DiskImageSchema),
};
