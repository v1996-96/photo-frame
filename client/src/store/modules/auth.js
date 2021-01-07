import { createNamespacedHelpers } from 'vuex';
import { api } from '@/api';
import { dataStates } from '@/config/data-state';
import { withDataState } from '@/utils/store';

const state = {
    accountsDataState: dataStates.notAsked,
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
    areAccountsLoading(state) {
        return state.accountsDataState === dataStates.loading;
    },
    areAccountsLoaded(state) {
        return state.accountsDataState === dataStates.loaded;
    },
    getAccountById: state => targetAccountId => {
        return state.accounts.find(({ _id }) => _id === targetAccountId) || {};
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
    setAccountsDataState(state, dataState) {
        state.accountsDataState = dataState;
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
    loadAccounts: withDataState('setAccountsDataState')(({ commit }) => {
        return api.auth.accounts().then(({ data: { result } }) => {
            commit('setAccounts', result);
        });
    }),
    async logout({ dispatch }, account) {
        await api.auth.logout(account);
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
