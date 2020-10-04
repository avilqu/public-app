<template>
    <div class="col-sm-12">
        <div class="__auth-card mt-3 card text-center">
            <div class="card-body">
                <h5 class="card-title mt-3 mb-3">
                    <strong>Reset your password</strong>
                </h5>
                <p class="mb-3 text-center text-muted">
                    Password must be at least 6 characters.
                </p>
                <form id="__reset-password">
                    <label for="inputEmail" class="sr-only">New password</label>
                    <input
                        type="password"
                        id="inputPassword"
                        class="form-control bg-dark text-light mb-2"
                        placeholder="New password"
                        required
                        autofocus
                        v-model="password"
                    />
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input
                        type="password"
                        id="inputPasswordConfirmation"
                        class="form-control bg-dark text-light"
                        placeholder="Password confirmation"
                        required
                        v-model="confirmation"
                    />
                    <br />
                    <button
                        type="submit"
                        class="btn btn-outline-success btn-block"
                        @click.prevent="updatePassword()"
                    >
                        Save password
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { auth } from '@/services/auth.js';

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
                await auth.updatePassword(
                    this.$route.params.id,
                    this.$route.params.token,
                    this.password,
                    this.confirmation
                )
            ) {
                this.$router.push('/login');
            }
        }
    }
};
</script>

<style></style>
