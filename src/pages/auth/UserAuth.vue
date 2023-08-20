<template>
    <div>
        <base-dialog :show="!!error" title="An error occured" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" title="Authenticating..." fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control" :class="{ errors: !emailIsValid }">
                    <label for="email">Your E-Mail</label>
                    <input type="email" id="email" v-model.trim="email" @input="clearValidity('email')">
                    <small v-if="!emailIsValid">Please enter a valid email address!</small>
                </div>
                <div class="form-control" :class="{ errors: !passwordIsValid }">
                    <label for="password">Your Password</label>
                    <input type="password" id="password" v-model.trim="password" @input="clearValidity('password')">
                    <small v-if="!passwordIsValid">Please enter a valid password! (must be at least 6 characters
                        long)</small>
                </div>
                <base-button>{{ submitButtonCaption }}</base-button>
                <base-button mode="outline" type="button" @click="switchAuthMode">{{ switchModeButtonCaption
                }}</base-button>
            </form>
        </base-card>
    </div>
</template>

<script>
export default {
    name: 'UserAuth',
    data() {
        return {
            email: '',
            password: '',
            emailIsValid: true,
            passwordIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        }
    },
    computed: {
        submitButtonCaption() {
            return this.mode === 'login' ? 'Login' : 'Sign Up';
        },
        switchModeButtonCaption() {
            return this.mode === 'login' ? 'Switch to Sign Up' : 'Switch to Login';
        }
    },
    methods: {
        async submitForm() {
            this.emailIsValid = true;
            this.passwordIsValid = true;
            if (this.email === '' || !this.email.includes('@')) {
                this.emailIsValid = false;
            }
            if (this.password === '' || this.password.length < 6) {
                this.passwordIsValid = false;
            }
            if (!this.emailIsValid || !this.passwordIsValid) {
                return;
            }
            const authData = {
                email: this.email,
                password: this.password
            };

            this.isLoading = true;

            if (this.mode === 'login') {
                try {
                    await this.$store.dispatch('login', authData);

                    const redirectUrl = this.$route.query.redirect || '/coaches';
                    this.$router.replace(redirectUrl);

                } catch (error) {
                    this.isLoading = false;
                    this.error = error.message || 'Failed to login!';
                }
            } else {
                try {
                    await this.$store.dispatch('signup', authData);

                    const redirectUrl = this.$route.query.redirect || '/coaches';
                    this.$router.replace(redirectUrl);

                } catch (error) {
                    this.isLoading = false;
                    this.error = error.message || 'Failed to sign up!';
                }
            }
        },
        switchAuthMode() {
            this.mode = this.mode === 'login' ? 'signup' : 'login';
        },
        clearValidity(input) {
            if (input === 'email') {
                this.emailIsValid = true;
            } else if (input === 'password') {
                this.passwordIsValid = true;
            }
        },
        handleError() {
            this.error = null;
        }
    }
}
</script>

<style scoped>
form {
    margin: 1rem;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}

.errors {
    font-weight: bold;
    color: rgb(155, 28, 28);
}
</style>