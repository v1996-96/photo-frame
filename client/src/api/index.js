import axios from 'axios';

const client = axios.create({
    baseURL: '/api',
});

export const api = {
    auth: () => client.post('/auth'),
    authCheck: () => client.post('/auth/check'),
};
