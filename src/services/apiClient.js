import { store } from '@/store/store.js';
import axios from 'axios';
import Vue from 'vue';

export const apiClient = new Vue({
    methods: {
        async updateUser(user) {
            try {
                const res = await axios.post(
                    `/api/user/${user._id}/update`,
                    user
                );
                if (res.data.status === 'success') {
                    store.commit('alert/success', res.data.message);
                } else store.commit('alert/error', res.data.message);
                return res.data;
            } catch (e) {
                return e;
            }
        },

        async deleteUser(user) {
            try {
                const res = await axios.get(`/api/user/${user._id}/delete`);
                if (res.data.status === 'success') {
                    store.commit('alert/success', res.data.message);
                } else store.commit('alert/error', res.data.message);
                return res.data;
            } catch (e) {
                return e;
            }
        },

        async getUserList() {
            try {
                const res = await axios.get('/api/user/list');
                if (res.data.status === 'success') {
                    return res.data.data.users;
                } else store.commit('alert/error', res.data.message);
            } catch (e) {
                return e;
            }
        },

        async getUser(id) {
            try {
                const res = await axios.get(`/api/user/${id}`);
                if (res.data.status === 'success') {
                    return res.data.data.user;
                } else store.commit('alert/error', res.data.message);
            } catch (e) {
                return e;
            }
        }
    }
});
