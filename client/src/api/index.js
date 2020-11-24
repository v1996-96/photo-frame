import axios from 'axios';

const client = axios.create({
    baseURL: '/api',
});

export const api = {
    auth: {
        code: () => client.post('/auth/code'),
        check: () => client.post('/auth/check'),
        accounts: () => client.get('/auth/accounts'),
        logout: userId => client.post('/auth/logout', { userId }),
    },
    gallery: {
        structure: ({ userId, limit, offset, path }) =>
            client.get('gallery/structure', { params: { userId, limit, offset, path } }),
    },
};
