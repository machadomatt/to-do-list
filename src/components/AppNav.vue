<template>
    <div id="nav">
        <router-link to="/">
            <div class="logo">
                <img src="../assets/todolist.svg" alt="To Do List" />
                <h1><strong>To Do</strong> List</h1>
            </div>
        </router-link>
        <theme-toggle :mode="mode" @toggle="$emit('toggle')" />
        <button type="button" class="logout" @click="logout">Logout</button>
    </div>
</template>

<script>
import ThemeToggle from './ThemeToggle'
import { authComputed } from '../store/helpers'

export default {
    components: { ThemeToggle },
    props: ['mode'],
    computed: {
        ...authComputed
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
        }
    }
}
</script>

<style lang="scss" scoped>
#nav {
    display: flex;
    align-items: center;
    min-height: 5rem;
    padding: 1.5rem 1.5rem;
    background-color: var(--nav-bg);
}

.router-link-exact-active {
    color: #ffffff;
    border-bottom: 2px solid #ffffff;
}
.logo {
    display: flex;
    align-items: center;
    color: $white;

    img {
        display: block;
        width: 3rem;
        margin-right: 0.5rem;
    }

    h1 {
        margin: 0;
        font-weight: normal;
        font-size: 2rem;
    }
}

a {
    text-decoration: none;
}

.logout {
    border: 0;
    background-color: transparent;
    color: var(--logout-color);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    margin-left: 4rem;
    cursor: pointer;
    align-self: stretch;

    &:hover,
    &:focus {
        background-color: var(--logout-bg);
        color: var(--nav-bg);
        outline: 0;
    }
}
</style>
