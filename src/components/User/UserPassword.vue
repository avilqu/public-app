<template>
    <div class="col-sm-12">
        <form class="form-signin">
            <h1 class="h3 mb-3 font-weight-normal text-center">
                Enter a new password
            </h1>
            <label for="inputEmail" class="">New password</label>
            <input
                type="password"
                id="inputPassword"
                class="form-control bg-dark text-light"
                required
                autofocus
                v-model="password"
            />
            <br />
            <label for="inputPassword" class="">Password confirmation</label>
            <input
                type="password"
                id="inputPasswordConfirmation"
                class="form-control bg-dark text-light"
                required
                v-model="confirmation"
            />
            <br />
            <button
                class="btn btn-outline-success"
                @click.prevent="updatePassword()"
            >
                Save password
            </button>
        </form>
    </div>
</template>

<script>
import { userClient } from './../../services/userClient.js';

export default {
    data: function() {
        return {
            password: '',
            confirmation: ''
        };
    },
    props: {
        user: {}
    },
    methods: {
        async updatePassword() {
            if (
                await userClient.updatePassword(
                    this.$route.params.id,
                    this.$route.params.token,
                    this.password,
                    this.confirmation
                )
            ) {
                this.$router.push('/');
            }
        }
    }
};
</script>

<style></style>
