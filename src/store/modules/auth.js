import { authClient } from '@/services/authClient.js';
import { router } from '@/services/router.js';
import { eventBus } from '@/services/eventBus.js';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        async login({ dispatch, commit }, credentials) {
            const res = await authClient.login(credentials);
            if (res.status === 'success') {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                commit('loginSuccess', res.data.user);
                router.push('/');
            } else {
                eventBus.alert('danger', res.message);
                commit('loginFailure', res.message);
            }
        },

        async auth({ commit }) {
            const res = await authClient.auth();
            if (res.status === 'success') {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                commit('loginSuccess', res.data.user);
                router.push('/');
            } else {
                eventBus.alert('danger', res.message);
                commit('loginFailure', res.message);
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
