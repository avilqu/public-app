import { eventBus } from './eventBus.js';
import axios from 'axios';
import Vue from 'vue';

export const userClient = new Vue({
    methods: {
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
                    return res.data;
                } else eventBus.alert('danger', res.data.message);
            } catch (e) {
                return e;
            }
        },
        async updateUser(user) {
            try {
                const res = await axios.post(
                    '/api/user/' + user._id + '/update/',
                    user
                );
                if (res.data.status === 'success') {
                    eventBus.alert('success', res.data.message);
                    return res.data;
                } else eventBus.alert('danger', res.data.message);
            } catch (e) {
                return e;
            }
        },
        async deleteUser(user) {
            try {
                const res = await axios.get(
                    '/api/user/' + user._id + '/delete/'
                );
                if (res.data.status === 'success') {
                    eventBus.alert('success', res.data.message);
                    return res.data;
                } else eventBus.alert('danger', res.data.message);
            } catch (e) {
                return e;
            }
        },
        async getUserList() {
            try {
                const res = await axios.get('/api/user/list');
                if (res.data.status === 'success') {
                    return res.data.data.users;
                } else eventBus.alert('danger', res.data.message);
            } catch (e) {
                return e;
            }
        },
        async getUser(id) {
            try {
                const res = await axios.get('/api/user/' + id);
                if (res.data.status === 'success') {
                    return res.data.data.user;
                } else eventBus.alert('danger', res.data.message);
            } catch (e) {
                return e;
            }
        }
    }
});
