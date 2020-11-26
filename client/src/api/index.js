import axios from 'axios';

const client = axios.create({
    baseURL: '/api',
});

export const api = {
    auth: {
        code: () => client.post('/auth/code'),
        check: () => client.post('/auth/check'),
        accounts: () => client.get('/auth/accounts'),
        logout: accountId => client.post('/auth/logout', { accountId }),
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
};
