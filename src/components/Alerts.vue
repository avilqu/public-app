<template>
    <div
        v-if="alert.message"
        :class="`alert-${alert.type}`"
        class="alert alert-dismissible fade show text-center _alert"
        role="alert"
    >
        {{ alert.message }}
        <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
            @click="$store.commit('alert/reset')"
        >
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
export default {
    computed: {
        alert() {
            return this.$store.state.alert;
        }
    }
};
</script>

<style scoped>
@import './../assets/css/alert.css';
</style>
