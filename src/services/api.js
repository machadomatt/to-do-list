import axios from 'axios'

const API = axios.create({
    baseURL: `https://upload-to-do-list.herokuapp.com`,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    registerUser(data) {
        return API.post('/register', data)
    },
    loginUser(data) {
        return API.post('/login', data)
    },
    setDefaultHeadersAuth(auth) {
        API.defaults.headers.common['Authorization'] = auth
    },
    getTodos() {
        return API.get('/post')
    },
    updateTodo(todo) {
        return API.put(`/post/${todo.id}`, todo)
    },
    newTodo(data) {
        return API.post('/post', data)
    },
    deleteTodo(todoId) {
        return API.delete(`/post/${todoId}`)
    },
    getAPI() {
        return API
    }
}
