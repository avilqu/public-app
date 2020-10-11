<template>
    <div class="container-fluid">
        <div class="row" v-if="user" id="__main-row">
            <app-header></app-header>
            <app-menu></app-menu>
            <main class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <app-alerts></app-alerts>
                <router-view></router-view>
            </main>
        </div>
        <div v-else>
            <app-alerts></app-alerts>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Alerts from '@/components/Alerts.vue';
import Menu from '@/components/Menu.vue';

export default {
    computed: {
        user() {
            return this.$store.state.auth.user;
        }
    },

    watch: {
        $route() {
            this.$store.commit('alert/reset');
        }
    },

    components: {
        'app-header': Header,
        'app-alerts': Alerts,
        'app-menu': Menu
    }
};
</script>

<style>
@import './assets/css/main.css';
</style>
