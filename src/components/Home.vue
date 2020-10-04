<template>
    <div class="col-sm-12">
        <h1 v-if="user">Welcome, {{ user.name }}</h1>
        <br />
    </div>
</template>

<script>
import { auth } from './../services/auth.js';
export default {
    props: {
        user: {}
    },

    created() {
        if (!this.user) this.$router.push('/login');
    }
};
</script>

<style></style>
