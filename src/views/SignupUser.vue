<template
    ><div class="signup">
        <div class="main">
            <div class="main__inner">
                <div class="logo">
                    <img src="../assets/todolist.svg" alt="To Do List" />
                    <h1><strong>To Do</strong> List</h1>
                </div>
                <h2 class="main__title">Bem-vindo(a)</h2>
                <p class="main__paragraph">
                    Faça login ou cadastre-se para continuar.
                </p>
                <transition name="fade-up" appear>
                    <div class="form-area">
                        <form @submit.prevent="signup" :class="{ hasError: $v.$anyError }">
                            <input
                                v-model="name"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                :class="{ error: $v.name.$error }"
                                @input="delayTouch($v.name)"
                            />
                            <small v-if="!$v.name.required">Name is required</small>
                            <small v-if="!$v.name.simpleName">
                                Your name can't contain spaces or special characters
                            </small>

                            <input
                                v-model="email"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="E-mail"
                                :class="{ error: $v.email.$error }"
                                @input="delayTouch($v.email)"
                            />
                            <small v-if="!$v.email.required">E-mail is required</small>
                            <small v-if="!$v.email.email">Please enter a valid e-mail address</small>

                            <input
                                v-model="password"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                :class="{ error: $v.password.$error }"
                                @input="delayTouch($v.password)"
                            />
                            <small v-if="!$v.password.required">Password is required</small>
                            <small v-if="!$v.password.minLength">
                                Your password should contain between {{ $v.password.$params.minLength.min }} and
                                {{ $v.password.$params.maxLength.max }} characters
                            </small>

                            <span class="errors">{{ error }}</span>
                            <span class="loading" v-if="isLoading">
                                Loading...
                            </span>

                            <button type="submit" name="button">Login</button>
                        </form>
                    </div>
                </transition>
                <div class="login-register">
                    <router-link to="/login">
                        Login
                    </router-link>
                    <span class="sep">|</span>
                    <router-link to="/signup">
                        Sign up
                    </router-link>
                </div>
            </div>
        </div>

        <div class="hero">
            <img class="hero__image" src="../assets/hero.svg" alt="Hero" />
        </div>

        <div class="aside"></div>
    </div>
</template>

<script>
import { required, minLength, email, helpers, maxLength } from 'vuelidate/lib/validators'

const simpleName = helpers.regex('simpleName', /^[a-zA-ZÀ-ú]*$/)
const touchMap = new WeakMap()

export default {
    name: 'SignUp',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            error: null,
            isLoading: false
        }
    },
    methods: {
        signup() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.error = 'Please fill the form correctly.'
            } else {
                this.error = null
                this.isLoading = true
                this.$store
                    .dispatch('register', {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    })
                    .then(() => {
                        this.isLoading = false
                        this.$router.push({ name: 'list' })
                    })
                    .catch(err => {
                        this.errors = err.response.data.error_message
                    })
            }
        },
        delayTouch($v) {
            $v.$reset()
            if (touchMap.has($v)) {
                clearTimeout(touchMap.get($v))
            }
            touchMap.set($v, setTimeout($v.$touch, 1000))
        }
    },
    validations: {
        name: {
            required,
            simpleName
        },
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(30)
        }
    }
}
</script>

<style lang="scss" scoped></style>
