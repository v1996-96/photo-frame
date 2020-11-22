const YANDEX_OAUTH_HOST = 'https://oauth.yandex.ru';
const YANDEX_LOGIN_HOST = 'https://login.yandex.ru';

const CLIENT_ID = '772f7d0b7c9743dcb541f89f9a87785d';
const CLIENT_SECRET = '0614e02ba5dd4ceda859a044a777c062';
const DEVICE_ID = '927d7a5a-aa7c-472e-b4ee-8f215cb30865';
const DEVICE_NAME = 'photo-frame';

// https://oauth.yandex.ru/client/772f7d0b7c9743dcb541f89f9a87785d/info
const SCOPE = [
    'fotki:delete',
    'login:avatar',
    'fotki:read',
    'fotki:update',
    'fotki:write',
    'login:birthday',
    'cloud_api:disk.app_folder',
    'cloud_api:disk.read',
    'cloud_api:disk.write',
    'login:info',
    'cloud_api:disk.info',
];

module.exports = {
    YANDEX_OAUTH_HOST,
    YANDEX_LOGIN_HOST,
    CLIENT_ID,
    CLIENT_SECRET,
    DEVICE_ID,
    DEVICE_NAME,
    SCOPE: SCOPE.concat(' '),
};
