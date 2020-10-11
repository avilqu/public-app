export const alert = {
    namespaced: true,

    state: {
        type: null,
        message: null
    },

    mutations: {
        success(state, message) {
            state.type = 'success';
            state.message = message;
        },

        error(state, message) {
            state.type = 'danger';
            state.message = message;
        },

        reset(state) {
            state.type = null;
            state.message = null;
        }
    }
};
