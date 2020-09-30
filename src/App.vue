<template>
    <div class="container-fluid">
        <div class="row" id="__main-row">
            <app-header :user="user"></app-header>
            <app-menu v-if="user" :user="user"></app-menu>
            <main class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <app-alerts></app-alerts>
                <router-view :user="user"></router-view>
            </main>
        </div>
    </div>
</template>

<script>
import { eventBus } from './services/eventBus.js';
import { auth } from './services/auth.js';

import Header from './components/Header.vue';
import Alerts from './components/Alerts.vue';
import Login from './components/Login.vue';
import Menu from './components/Menu.vue';
import UserPassword from './components/User/UserPassword.vue';

export default {
    data: function() {
        return {
            user: {}
        };
    },
    components: {
        'app-header': Header,
        'app-alerts': Alerts,
        // 'app-login': Login,
        'app-menu': Menu
        // 'app-user-password': UserPassword
    },
    created() {
        this.user = auth.getUser();
        eventBus.$on('login', () => {
            this.user = auth.getUser();
        });
        eventBus.$on('logout', () => {
            this.user = auth.getUser();
        });
    }
};
</script>

<style>
@import './assets/css/main.css';
</style>
