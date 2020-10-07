<template>
    <div class="col-sm-12">
        <h1 v-if="user">Welcome, {{ user.name }}</h1>
        <br />
    </div>
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

<style></style>
