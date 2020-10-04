import { eventBus } from './eventBus.js';
import axios from 'axios';
import Vue from 'vue';

export const auth = new Vue({
    methods: {
        async login(credentials) {
            try {
                const res = await axios.post('/api/login', credentials);
                if (res.data.status === 'success') {
                    localStorage.setItem('user', JSON.stringify(res.data.data));
                    eventBus.login(res.data.data.user);
                } else eventBus.alert('danger', res.data.message);
                return res.data;
            } catch (e) {
                return e;
            }
        },

        async auth() {
            try {
                const res = await axios.get('/api/user/profile');
                if (res.data.status === 'success') {
                    localStorage.setItem('user', JSON.stringify(res.data.data));
                    eventBus.login(res.data.data.user);
                } else eventBus.alert('danger', res.data.message);
                return res.data;
            } catch (e) {
                return e;
            }
        },

        async verify(id, token) {
            const res = await axios.get(`/api/user/${id}/verify/${token}`);
            if (res.data.status === 'success') {
                eventBus.alert('success', res.data.message);
            } else eventBus.alert('danger', res.data.message);
        },

        async logout() {
            try {
                const res = await axios.get('/api/logout');
                if (res.data.status === 'success') {
                    localStorage.removeItem('user');
                    eventBus.logout();
                }
            } catch (e) {
                return e;
            }
        },

        async createUser(user) {
            try {
                const res = await axios.post('/api/user/signup', user);
                if (res.data.status === 'success') {
                    eventBus.alert('success', res.data.message);
                } else eventBus.alert('danger', res.data.message);
                return res.data;
            } catch (e) {
                return e;
            }
        },

        async requestResetToken(email) {
            try {
                const res = await axios.post('/api/user/reset-password', email);
                if (res.data.status === 'success') {
                    eventBus.alert('success', res.data.message);
                    return res.data;
                } else eventBus.alert('danger', res.data.message);
            } catch (e) {
                return e;
            }
        },

        async updatePassword(id, token, password, confirmation) {
            if (password !== confirmation) {
                return eventBus.alert('danger', "Passwords don't match.");
            }
            if (password.length < 6) {
                return eventBus.alert('danger', 'Password too short.');
            }

            try {
                const res = await axios.post(
                    '/api/user/' + id + '/password/' + token,
                    { password }
                );
                if (res.data.status === 'success') {
                    eventBus.alert('success', res.data.message);
                } else eventBus.alert('danger', res.data.message);
                return res.data;
            } catch (e) {
                return e;
            }
        },

        updateUser(user) {
            localStorage.setItem('user', JSON.stringify(user));
        },

        isLoggedIn() {
            return !!JSON.parse(localStorage.getItem('user'));
        },

        getUser() {
            if (this.isLoggedIn()) {
                return JSON.parse(localStorage.getItem('user')).user;
            }
        }
    }
});
