<template>
    <nav class="navbar navbar-dark bg-dark mb-4 fixed-top shadow">
        <router-link tag="a" :to="'/'" class="navbar-brand">
            <img class="mb-4" src="./../assets/img/logo.png" />
        </router-link>

        <div v-if="user" class="dropdown ml-auto">
            <div
                class="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                v-once
            >
                {{ user.name }}
                <img
                    v-if="user.pic"
                    :src="user.pic"
                    alt="Profile"
                    class="__profilePic"
                />
                <img
                    v-else
                    class="__profilePic"
                    src="./../assets/img/default-user-pic.png"
                    alt="Profile"
                />
            </div>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <router-link tag="a" :to="'/user'" class="dropdown-item">
                    Profile
                </router-link>
                <a class="dropdown-item" @click="logout()">
                    Logout
                </a>
            </div>
        </div>
        <div v-else>
            <router-link
                tag="button"
                :to="'/login'"
                type="button"
                class="btn btn-outline-success"
            >
                Log in
            </router-link>
            <router-link
                tag="button"
                :to="'/user/create'"
                style="margin-left: 0.5em;"
                class="btn btn-outline-danger"
            >
                Sign up
            </router-link>
        </div>
    </nav>
</template>

<script>
import { authClient } from '@/services/authClient.js';

export default {
    computed: {
        user() {
            return this.$store.state.auth.user;
        }
    },

    methods: {
        logout() {
            this.$store.dispatch('auth/logout');
        }
    }
};
</script>

<style>
@import './../assets/css/header.css';
</style>
