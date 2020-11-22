import { api } from '@/api';
import { createNamespacedHelpers } from 'vuex';

const state = {
    accounts: [],
    authorization: {
        interval: 5,
        expiresAt: null,
        userCode: null,
        verificationUrl: null,
    },
};

const getters = {
    isAuthorized(state) {
        return Boolean(state.accounts.length);
    },
};

const mutations = {
    setCode(state, data) {
        state.authorization = data;
    },
    clearCode(state) {
        state.authorization.userCode = null;
    },
    setAccounts(state, accounts) {
        state.accounts = accounts;
    },
};

const actions = {
    getCode({ commit }) {
        return api.auth.code().then(({ data: { result } }) => {
            commit('setCode', result);
        });
    },
    async checkAuth({ commit, dispatch }) {
        const response = await api.auth.check();

        if (response.data.result.success) {
            commit('clearCode');
            dispatch('loadAccounts');
            return true;
        }

        return false;
    },
    loadAccounts({ commit }) {
        return api.auth.accounts().then(({ data: { result } }) => {
            commit('setAccounts', result);
        });
    },
    async logout({ dispatch }, userId) {
        await api.auth.logout(userId);
        await dispatch('loadAccounts');
    },
};

export const NAMESPACE = 'auth';

export const helpers = createNamespacedHelpers(NAMESPACE);

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
