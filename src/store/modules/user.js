import { apiClient } from '@/services/apiClient.js';

export const user = {
    namespaced: true,

    state: {
        user: null
    },

    actions: {
        async loadUser({ commit }, id) {
            if (id) commit('update', { user: await apiClient.getUser(id) });
            else commit('update', { user: this.state.auth.user });
        }
    },

    mutations: {
        reset(state) {
            state.user = null;
        },

        update(state, args) {
            if (args.key) state.user[args.key] = args[args.key];
            else state.user = args.user;
        }
    }
};
