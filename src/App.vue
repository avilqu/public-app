<template>
    <div class="container-fluid">
        <div class="row" id="__main-row" v-if="user">
            <app-header></app-header>
            <app-menu></app-menu>
            <main class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <app-alerts></app-alerts>
                <router-view></router-view>
            </main>
        </div>
        <div id="__main-row" v-else>
            <app-header></app-header>
            <main>
                <app-alerts></app-alerts>
                <router-view></router-view>
            </main>
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
