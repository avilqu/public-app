import { authClient } from '@/services/authClient.js';
import { router } from '@/services/router.js';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export const auth = {
    namespaced: true,

    state: initialState,

    actions: {
        async login({ commit }, credentials) {
            const res = await authClient.login(credentials);
            if (res.status === 'success') {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                commit('loginSuccess', res.data.user);
                router.push('/');
            } else {
                commit('alert/error', res.message, { root: true });
                commit('loginFailure');
            }
        },

        async auth({ commit }) {
            const res = await authClient.auth();
            if (res.status === 'success') {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                commit('loginSuccess', res.data.user);
                router.push('/');
            } else {
                commit('alert/error', res.message, { root: true });
                commit('loginFailure');
                router.push('/login');
            }
        },

        async logout({ commit }) {
            const res = await authClient.logout();
            if (res.status === 'success') {
                localStorage.removeItem('user');
                commit('logout');
                router.push('/login');
            }
        }
    },

    mutations: {
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },

        loginFailure(state) {
            state.status = {};
            state.user = null;
        },

        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
};
