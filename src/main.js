import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './services/api'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(Vuelidate)

Vue.mixin({
    methods: {
        updateList(showUndone = true) {
            this.$store
                .dispatch('todos')
                .then(() => {
                    this.isLoading = false
                    if (showUndone) this.todos = this.$store.getters.undoneTodos
                    else this.todos = this.$store.getters.doneTodos
                })
                .catch(error => {
                    console.log('Error on list to-dos:', error)
                })
        }
    }
})

new Vue({
    router,
    store,
    created() {
        const userString = localStorage.getItem('user')
        if (userString) {
            const userData = JSON.parse(userString)
            this.$store.commit('SET_USER_DATA', userData)
        }
        const API = api.getAPI()
        API.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) {
                    this.$store.dispatch('logout')
                }
                return Promise.reject(error)
            }
        )
    },
    render: h => h(App)
}).$mount('#app')
