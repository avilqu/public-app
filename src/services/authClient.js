import { store } from '@/store/store.js';
import axios from 'axios';
import Vue from 'vue';

export const authClient = new Vue({
    methods: {
        async login(credentials) {
            try {
                const res = await axios.post('/api/login', credentials);
                return res.data;
            } catch (e) {
                return e;
            }
        },

        async auth() {
            try {
                const res = await axios.get('/api/user/profile');
                return res.data;
            } catch (e) {
                return e;
            }
        },

        async logout() {
            try {
                const res = await axios.get('/api/logout');
                return res.data;
            } catch (e) {
                return e;
            }
        },

        async verify(id, token) {
            try {
                const res = await axios.get(`/api/user/${id}/verify/${token}`);
                if (res.data.status === 'success') {
                    store.commit('alert/success', res.data.message);
                } else store.commit('alert/error', res.data.message);
            } catch (e) {
                return e;
            }
        },

        async createUser(user) {
            try {
                const res = await axios.post('/api/user/signup', user);
                if (res.data.status === 'success') {
                    store.commit('alert/success', res.data.message);
                } else store.commit('alert/error', res.data.message);
                return res.data;
            } catch (e) {
                return e;
            }
        },

        async requestResetToken(email) {
            try {
                const res = await axios.post('/api/user/reset-password', email);
                if (res.data.status === 'success') {
                    store.commit('alert/success', res.data.message);
                    return res.data;
                } else store.commit('alert/error', res.data.message);
            } catch (e) {
                return e;
            }
        },

        async updatePassword(id, token, password) {
            try {
                const res = await axios.post(
                    `/api/user/${id}/password/${token}`,
                    { password }
                );
                if (res.data.status === 'success') {
                    store.commit('alert/success', res.data.message);
                } else store.commit('alert/error', res.data.message);
                return res.data;
            } catch (e) {
                return e;
            }
        }
    }
});
