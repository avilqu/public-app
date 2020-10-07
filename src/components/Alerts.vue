<template>
    <div v-if="alerts.length > 0" class="col-sm-12 text-center">
        <div
            v-for="alert in alerts"
            :key="alert.id"
            :class="alert.class"
            class="alert alert-dismissible fade show _alert"
            role="alert"
        >
            {{ alert.message }}
            <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</template>

<script>
import { eventBus } from '@/services/eventBus.js';

export default {
    data: function() {
        return {
            alerts: []
        };
    },

    computed: {
        user() {
            return this.$store.state.auth.user;
        }
    },

    created() {
        eventBus.$on('alert', (alert) => {
            alert.id = this.alerts.length;
            alert.class = `alert-${alert.model}`;
            this.alerts.push(alert);
        });
    }
};
</script>

<style>
._alert {
    color: red;
    position: fixed;
    width: 100%;
    z-index: 1;
}
</style>
