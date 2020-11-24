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

module.exports = {
    YANDEX_OAUTH_HOST,
    YANDEX_LOGIN_HOST,
    YANDEX_CLOUD_HOST,
    SCOPE: SCOPE.concat(' '),
};
