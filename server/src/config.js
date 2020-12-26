// https://forismatic.com/ru/api/
const FORISMATIC_HOST = 'http://api.forismatic.com/api/1.0/';

const YANDEX_OAUTH_HOST = 'https://oauth.yandex.ru';
const YANDEX_LOGIN_HOST = 'https://login.yandex.ru';
const YANDEX_CLOUD_HOST = 'https://cloud-api.yandex.net/v1';

// https://oauth.yandex.ru/client/client_id/info
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

const BACKLIGHT_CONFIG = {
    MANUAL: 'manual',
    AUTO: 'auto',
};

module.exports = {
    FORISMATIC_HOST,
    YANDEX_OAUTH_HOST,
    YANDEX_LOGIN_HOST,
    YANDEX_CLOUD_HOST,
    SCOPE: SCOPE.concat(' '),
    BACKLIGHT_CONFIG,
};
