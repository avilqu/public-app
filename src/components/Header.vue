<template>
    <nav class="navbar navbar-dark bg-dark mb-4 fixed-top shadow">
        <router-link tag="a" :to="'/'" class="navbar-brand">
            <img class="mb-4" src="./../assets/img/logo.png" />
        </router-link>

        <div class="dropdown ml-auto">
            <div
                class="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
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
    </nav>
</template>

<script>
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

<style scoped>
@import './../assets/css/header.css';
</style>
