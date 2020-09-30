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
        user: {},
        auth: Boolean,
        verify: Boolean
    },
    async created() {
        // if (this.$route.path == '/auth') auth.auth();
        if (this.auth) auth.auth();
        if (this.verify) {
            auth.verify(this.$route.params.id, this.$route.params.token);
        }
    }
};
</script>

<style></style>
