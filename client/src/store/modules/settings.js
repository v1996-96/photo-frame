import { createNamespacedHelpers } from 'vuex';
import { api } from '@/api';
import { dataStates } from '@/config/data-state';
import { withDataState } from '@/utils/store';

const state = {
    settingsDataState: dataStates.notAsked,
    settings: {},
};

const getters = {
    areSettingsLoaded(state) {
        return state.settingsDataState === dataStates.loaded;
    },
};

const mutations = {
    setSettings(state, settings) {
        state.settings = settings;
    },
    setSettingsDataState(state, dataState) {
        state.settingsDataState = dataState;
    },
};

const actions = {
    loadSettings: withDataState('setSettingsDataState')(({ commit }) => {
        return api.settings.get().then(({ data: { result } }) => {
            commit('setSettings', result);
        });
    }),
    updateSettings({ commit }, updateObject) {
        return api.settings.set(updateObject).then(({ data: { result } }) => {
            commit('setSettings', result);
        });
    },
};

export const NAMESPACE = 'settings';

export const helpers = createNamespacedHelpers(NAMESPACE);

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
