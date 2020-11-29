const { Schema, model } = require('mongoose');

const AccountNamespace = 'Account';

const AccountSchema = new Schema({
    id: String,
    login: String,
    clientId: String,
    displayName: String,
    realName: String,
    firstName: String,
    lastName: String,
    sex: String,
    birthday: String,
    defaultAvatarId: String,
    isAvatarEmpty: String,
    psuid: String,
    avatarUrl: String,
    credentials: {
        accessToken: String,
        refreshToken: String,
        expiresIn: Number,
        tokenType: String,
    },
});

AccountSchema.methods.isAuthorized = function () {
    return Boolean(this.credentials && this.credentials.accessToken);
};

module.exports = {
    AccountNamespace,
    AccountSchema,
    Account: model(AccountNamespace, AccountSchema),
};
