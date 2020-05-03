<template>
    <div class="todos">
        <div class="container">
            <template v-if="!isLoading">
                <div class="todos__header">
                    <h2>{{ pageTitle }}</h2>
                    <div class="list-switch">
                        <button class="list-switch__btn" v-if="viewUndone" @click="changeListView">
                            Show completed to-dos
                        </button>
                        <button class="list-switch__btn" v-else @click="changeListView">
                            Show to-dos
                        </button>
                    </div>
                </div>
                <div v-if="hasTodos">
                    <to-do v-for="todo in todos" :key="todo.id" :todo="todo" @inner-update="innerUpdateList" />
                </div>
                <div class="notodo" v-else>
                    You don't have any to-do yet
                </div>
                <div class="todos__add">
                    <form @submit.prevent="addTodo">
                        <input type="text" name="addtodo" id="addtodo" placeholder="Add todo" v-model="newTodo" />
                        <button type="submit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 31.444 31.444"
                                style="enable-background:new 0 0 31.444 31.444;"
                                xml:space="preserve"
                            >
                                <path
                                    d="M1.119,16.841c-0.619,0-1.111-0.508-1.111-1.127c0-0.619,0.492-1.111,1.111-1.111h13.475V1.127
	C14.595,0.508,15.103,0,15.722,0c0.619,0,1.111,0.508,1.111,1.127v13.476h13.475c0.619,0,1.127,0.492,1.127,1.111
	c0,0.619-0.508,1.127-1.127,1.127H16.833v13.476c0,0.619-0.492,1.127-1.111,1.127c-0.619,0-1.127-0.508-1.127-1.127V16.841H1.119z"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
            </template>
            <div class="loading-list" v-else>
                <span>Loading list</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="margin: auto; background: transparent; display: block; shape-rendering: auto;"
                    width="90px"
                    height="90px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                >
                    <defs>
                        <mask id="ldio-r28xzyiu8qh-mask"><circle cx="50" cy="50" r="45" fill="#333"></circle></mask>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="none"></circle>
                    <circle cx="50" cy="50" r="30" stroke="none" stroke-width="10" fill="none"></circle>
                    <circle
                        cx="50"
                        cy="50"
                        r="30"
                        stroke="#aaa"
                        stroke-width="10"
                        stroke-linecap="square"
                        fill="none"
                        transform="rotate(695.066 50 50)"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="1s"
                            keyTimes="0;0.5;1"
                            values="0 50 50;180 50 50;720 50 50"
                        ></animateTransform>
                        <animate
                            attributeName="stroke-dasharray"
                            repeatCount="indefinite"
                            dur="1s"
                            keyTimes="0;0.5;1"
                            values="18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882"
                        ></animate>
                    </circle>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import ToDo from '../components/ToDo'

export default {
    name: 'List',
    components: { ToDo },
    data() {
        return {
            isLoading: true,
            todos: [],
            newTodo: '',
            viewUndone: true
        }
    },
    methods: {
        addTodo() {
            this.$store
                .dispatch('newTodo', {
                    title: this.newTodo,
                    status: false
                })
                .then(() => {
                    this.newTodo = ''
                    this.updateList()
                })
                .catch(error => console.log('Error:', error))
        },
        changeListView() {
            this.viewUndone = !this.viewUndone
            this.updateList(this.viewUndone)
        },
        innerUpdateList() {
            this.updateList()
        }
    },
    computed: {
        hasTodos() {
            return this.todos.length
        },
        pageTitle() {
            let title
            if (this.viewUndone) title = 'To-dos'
            else title = 'Completed to-dos'
            return title
        }
    },
    created() {
        this.updateList()
    }
}
</script>

<style lang="scss" scoped>
.todos {
    .notodo {
        margin: 5rem 0;
        font-weight: 500;
        color: var(--todo-color);
        display: block;
        text-align: center;
    }
    &__add {
        margin-top: 3rem;

        form {
            display: flex;
            flex-wrap: nowrap;
            padding: 2rem;
            border-bottom: 1px solid var(--card-border);
            input {
                flex-grow: 1;
                border: 0;
                background-color: transparent;
                padding: 1rem;
                color: var(--todo-color);

                &:hover,
                &:focus {
                    outline: 0;
                }
            }

            button {
                border: 0;
                background-color: transparent;

                &:focus {
                    outline: 0;
                }

                svg {
                    display: block;
                    fill: var(--card-border);
                    width: 2.3rem;
                    height: 2.3rem;
                    transition-property: fill;

                    &:hover,
                    &:focus {
                        fill: var(--success-color);
                    }
                }
            }
        }
    }

    &__header {
        margin-top: 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
            color: var(--todo-color);
        }
    }

    .list-switch {
        &__btn {
            border: 0;
            padding: 1rem 2rem;
            color: var(--todo-color);
            background-color: transparent;
            cursor: pointer;

            &:hover,
            &:focus {
                outline: 0;
                text-decoration: underline;
            }
        }
    }

    .loading-list {
        margin-top: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        span {
            font-size: 1.8rem;
            margin-bottom: 3rem;
        }
    }
}
</style>
