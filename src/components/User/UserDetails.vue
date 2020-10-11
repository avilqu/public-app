<template>
    <div class="col-sm-12" v-if="user">
        <h2>
            <img
                v-if="user.pic"
                :src="user.pic"
                class="__profilePicLarge"
                alt="Profile"
            />
            <img
                v-else
                class="__profilePicLarge"
                src="./../../assets/img/default-user-pic.png"
                alt="Profile"
            />
            {{ user.name }}
        </h2>
        <br />

        <table class="table table-hover">
            <tbody>
                <tr>
                    <td><strong>User name</strong></td>
                    <td>
                        <input
                            type="text"
                            class="form-control form-control-sm bg-dark text-light"
                            v-model="name"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>Email address</strong></td>
                    <td>
                        <input
                            type="text"
                            class="form-control form-control-sm bg-dark text-light"
                            v-model="email"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>Account created on</strong></td>
                    <td class="text-light">
                        {{
                            new Date(user.added).toLocaleDateString('en-NZ', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })
                        }}
                    </td>
                </tr>
            </tbody>
        </table>

        <br />

        <button
            type="button"
            class="btn btn-outline-success"
            @click="updateUser()"
        >
            Save changes
        </button>
        <button
            type="button"
            class="btn btn-outline-info"
            style="margin-left: 1em"
            @click="requestResetToken()"
        >
            Reset password
        </button>
    </div>
</template>

<script>
import { apiClient } from '@/services/apiClient.js';
import { authClient } from '@/services/authClient.js';

export default {
    computed: {
        user() {
            return this.$store.state.user.user;
        },

        name: {
            get() {
                return this.$store.state.user.user.name;
            },
            set(name) {
                this.$store.commit('user/update', {
                    key: 'name',
                    name
                });
            }
        },

        email: {
            get() {
                return this.$store.state.user.user.email;
            },
            set(email) {
                this.$store.commit('user/update', {
                    key: 'email',
                    email
                });
            }
        }
    },

    methods: {
        async requestResetToken() {
            await authClient.requestResetToken({
                email: this.user.email
            });
        },

        async updateUser() {
            await apiClient.updateUser(this.user);
        },

        async deleteUser() {
            if (await apiClient.deleteUser(this.user)) {
                this.$store.commit('user/reset');
            }
        }
    },

    created() {
        if (this.$route.params.id) {
            this.$store.dispatch('user/loadUser', this.$route.params.id);
        } else this.$store.dispatch('user/loadUser');
    }
};
</script>

<style scoped>
@import './../../assets/css/single.css';
</style>
