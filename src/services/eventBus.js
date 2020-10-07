import Vue from 'vue';

export const eventBus = new Vue({
    methods: {
        alert(model, message) {
            this.$emit('alert', { model, message });
        }
    }
});
