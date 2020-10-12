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
                        :class="{
                            __invalid: !validation.password
                        }"
                        placeholder="New password"
                        autofocus
                        v-model="formData.password"
                    />
                    <label for="inputPassword" class="sr-only"
                        >Confirm password</label
                    >
                    <input
                        type="password"
                        id="inputPasswordConfirmation"
                        class="form-control bg-dark text-light"
                        :class="{
                            __invalid: !validation.confirmation
                        }"
                        placeholder="Confirm password"
                        v-model="formData.confirmation"
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
import { authClient } from '@/services/authClient.js';

export default {
    data: function() {
        return {
            formData: {
                password: '',
                confirmation: ''
            },
            validation: {
                password: true,
                confirmation: true
            }
        };
    },

    methods: {
        passwordValidation() {
            let status = true;
            this.validation.password = true;
            this.validation.confirmation = true;
            if (this.formData.password.length < 6) {
                status = false;
                this.validation.password = false;
            }
            if (this.formData.password !== this.formData.confirmation) {
                status = false;
                this.validation.confirmation = false;
            }
            return status;
        },

        async updatePassword() {
            if (this.passwordValidation()) {
                await authClient.updatePassword(
                    this.$route.params.id,
                    this.$route.params.token,
                    this.formData.password
                );
            }
        }
    }
};
</script>

<style></style>
