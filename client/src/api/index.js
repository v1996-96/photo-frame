import axios from 'axios';

const client = axios.create({
    baseURL: '/api',
});

export const api = {
    auth: {
        code: () => client.post('auth/code'),
        check: () => client.post('auth/check'),
        accounts: () => client.get('auth/accounts'),
        logout: ({ _id }) => client.post('auth/logout', { _id }),
    },
    gallery: {
        structure: ({ accountId, limit, offset, path }) =>
            client.get('gallery/structure', { params: { accountId, limit, offset, path } }),
        getSelectedPaths: () => client.get('gallery/selected/get'),
        setSelectedPaths: ({ selectedPaths }) =>
            client.post('gallery/selected/set', { selectedPaths }),
        loadPreviews: () => client.post('gallery/previews/load'),
        getPreviewsList: () => client.get('gallery/previews/list/get'),
    },
    forismatic: {
        get: () => client.get('forismatic/get'),
    },
    settings: {
        get: () => client.get('settings/get'),
        set: settings => client.post('settings/set', settings),
    },
};
