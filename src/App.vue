<template>
    <div id="app" :class="mode === 'dark' ? 'dark' : 'light'">
        <div v-if="loggedIn">
            <app-nav :mode="mode" @toggle="toggle" />
        </div>
        <router-view class="page" />
    </div>
</template>

<script>
import { authComputed } from './store/helpers'
import AppNav from './components/AppNav'
export default {
    components: { AppNav },
    data() {
        return {
            mode: 'light'
        }
    },
    methods: {
        toggle() {
            if (this.mode === 'dark') {
                this.mode = 'light'
            } else {
                this.mode = 'dark'
            }
        }
    },
    computed: {
        ...authComputed
    }
}
</script>

<style lang="scss">
@import './assets/styles/global.scss';
#app {
    background-color: var(--bg-color);
}

.page {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    min-height: calc(100vh - 60px);
}

.fade {
    &-enter-active,
    &-leave-active {
        transition: opacity 0.5s;
    }

    &-enter,
    &-leave-to {
        opacity: 0;
    }
}

.fade-up {
    &-enter-active,
    &-leave-active {
        transition: opacity 1s;
    }

    &-enter,
    &-leave-to {
        opacity: 0;
    }
}
</style>
