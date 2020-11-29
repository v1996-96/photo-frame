const { Schema, Types, model } = require('mongoose');
const { AccountNamespace } = require('./account');

const DiskPathNamespace = 'DiskPath';

const DiskPathSchema = new Schema({
    path: String,
    updatedAt: Date,
    account: {
        type: Types.ObjectId,
        ref: AccountNamespace,
    },
});

module.exports = {
    DiskPathNamespace,
    DiskPathSchema,
    DiskPath: model(DiskPathNamespace, DiskPathSchema),
};
