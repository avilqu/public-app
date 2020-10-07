<template>
    <nav class="col-md-2 d-md-block sidebar">
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <p class="__menu-separator">App settings</p>
                <router-link tag="a" :to="'/user/list'" class="nav-item">
                    <i class="fas fa-user"></i>
                    &nbsp;&nbsp;Users
                </router-link>
                <!-- <router-link tag="a" :to="'/settings/alerts'" class="nav-item">
                    <i class="fas fa-exclamation-triangle"></i>
                    &nbsp;&nbsp;Alerts
                </router-link> -->
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.auth.user;
        }
    }
};
</script>

<style scoped>
@import './../assets/css/menu.css';
</style>
