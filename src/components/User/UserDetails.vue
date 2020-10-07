<template>
    <div class="col-sm-12" v-if="selectedUser.name">
        <h2>
            <img
                v-if="selectedUser.pic"
                :src="selectedUser.pic"
                class="__profilePicLarge"
                alt="Profile"
            />
            <img
                v-else
                class="__profilePicLarge"
                src="./../../assets/img/default-user-pic.png"
                alt="Profile"
            />
            {{ selectedUser.name }}
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
                            :disabled="user.role < 4"
                            v-model="selectedUser.name"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>Email address</strong></td>
                    <td>
                        <input
                            type="text"
                            class="form-control form-control-sm bg-dark text-light"
                            :disabled="user.role < 4"
                            v-model="selectedUser.email"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>Account created on</strong></td>
                    <td class="text-light">
                        {{
                            new Date(selectedUser.added).toLocaleDateString(
                                'en-NZ',
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                }
                            )
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
    data: function() {
        return {
            selectedUser: {}
        };
    },

    computed: {
        user() {
            return this.$store.state.auth.user;
        }
    },

    methods: {
        async requestResetToken() {
            await authClient.requestResetToken({
                email: this.selectedUser.email
            });
        },

        async updateUser() {
            await apiClient.updateUser(this.selectedUser);
        },

        async deleteUser() {
            if (await apiClient.deleteUser(this.selectedUser)) {
                this.selectedUser = {};
            }
        }
    },

    async created() {
        if (this.$route.params.id) {
            this.selectedUser = await apiClient.getUser(this.$route.params.id);
        } else this.selectedUser = this.user;
    }
};
</script>

<style scoped>
@import './../../assets/css/single.css';
</style>
