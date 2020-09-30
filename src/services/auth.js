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
                    return res.data;
                } else eventBus.alert('danger', res.data.message);
            } catch (e) {
                return e;
            }
        },

        async auth() {
            const res = await axios.get('/api/user/profile');
            if (res.data.status === 'success') {
                localStorage.setItem('user', JSON.stringify(res.data.data));
                eventBus.login(res.data.data.user);
                return res.data;
            } else eventBus.alert('danger', res.data.message);
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
