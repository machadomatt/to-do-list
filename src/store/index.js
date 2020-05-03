import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import api from '../services/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        todos: []
    },
    mutations: {
        SET_USER_DATA(state, userData) {
            state.user = userData
            localStorage.setItem('user', JSON.stringify(userData))
            // axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
            api.setDefaultHeadersAuth(`Bearer ${userData.token}`)
        },
        SET_TODOS(state, todos) {
            state.todos = todos
        },
        PUSH_TODO(state, todo) {
            state.todos.push(todo)
        },
        SPLICE_TODO(state, todoId) {
            let todoIndex = state.todos.findIndex(todo => todo.id === todoId)
            state.todos.splice(todoIndex, 1)
        },
        // UPDATE_TODO(state, data) {
        //     console.log(data)
        // },
        CLEAR_USER_DATA() {
            // state.user = null
            localStorage.removeItem('user')
            // api.setDefaultHeadersAuth(null)
            location.reload()
        }
    },
    actions: {
        register({ commit }, credentials) {
            return api.registerUser(credentials).then(({ data }) => {
                commit('SET_USER_DATA', data)
            })
        },
        login({ commit }, credentials) {
            return api.loginUser(credentials).then(({ data }) => {
                commit('SET_USER_DATA', data)
            })
        },
        logout({ commit }) {
            commit('CLEAR_USER_DATA')
        },
        todos({ commit }) {
            return api.getTodos().then(({ data }) => {
                commit('SET_TODOS', data.user.posts)
            })
        },
        newTodo({ commit }, todoData) {
            return api.newTodo(todoData).then(({ data }) => {
                commit('PUSH_TODO', data)
            })
        },
        removeTodo({ commit }, todoId) {
            return api.deleteTodo(todoId).then(() => {
                commit('SPLICE_TODO', todoId)
            })
        }
        // updateTodo({ commit }, todo) {
        //     return api.updateTodo(todo).then(({ data }) => {
        //         commit('UPDATE_TODO', data)
        //     })
        // }
    },
    modules: {},
    getters: {
        loggedIn(state) {
            return !!state.user
        },
        userTodos(state) {
            return state.todos
        },
        undoneTodos(state) {
            return state.todos.filter(todo => todo.status == false)
        },
        doneTodos(state) {
            return state.todos.filter(todo => todo.status == true)
        }
    }
})
