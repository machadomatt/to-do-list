<template>
    <div class="todo">
        <div class="todo__status">
            <input type="checkbox" name="status" :id="todo.id" v-model="todo.status" @change="doneEdit" />
            <div class="todo__status-visible"></div>
        </div>
        <div class="todo__title">
            <input
                type="text"
                name="title"
                :id="'title-' + todo.id"
                v-model="todo.title"
                @blur="doneEdit"
                @keyup.enter="doneEdit"
            />
        </div>
        <div class="todo__delete">
            <button class="todo__btn-del" @click="removeTodo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 0 427 427.00131">
                    <path
                        d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
                    />
                    <path
                        d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
                    />
                    <path
                        d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"
                    />
                    <path
                        d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import api from '../services/api'
export default {
    name: 'ToDo',
    props: {
        todo: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    methods: {
        removeTodo() {
            this.$store.dispatch('removeTodo', this.todo.id).then(() => {
                this.$emit('inner-update')
            })
        },
        doneEdit() {
            if (this.todo.title.trim() != '') {
                // this.$store.dispatch('updateTodo', this.todo)
                api.updateTodo(this.todo).then(() => {
                    this.$emit('inner-update')
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.todo {
    padding: 2rem;
    display: flex;
    align-items: center;

    &:not(:last-of-type) {
        border-bottom: 1px solid var(--card-border);
    }

    &:first-child {
        margin-top: 3rem;
    }

    &__title {
        display: block;
        width: 100%;
        input {
            margin: 0 0 0 2rem;
            border: 0;
            padding: 1rem;
            display: block;
            width: 100%;
            background-color: transparent;
            color: var(--todo-color);

            &:hover,
            &:focus {
                outline: 0;
            }
        }
    }

    &__status {
        width: 2.5rem;
        height: 2.5rem;
        position: relative;

        > * {
            position: absolute;
        }

        &-visible {
            width: 2.5rem;
            height: 2.5rem;
            margin: 2px;
            background: var(--todo-status-bg);
            border: 1px solid var(--todo-status-border);
            border-radius: 50%;
            transition-property: background-color, border;
        }

        > input {
            z-index: 1;
            opacity: 0;
            left: 50%;
            top: 50%;
            transform: translatex(-50%) translatey(-50%);
            display: block;
            cursor: pointer;
            width: 2.5rem;
            height: 2.5rem;
        }

        > input:checked + .todo__status-visible {
            background: var(--success-color);
            border-color: var(--success-color);
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTQnIGhlaWdodD0nMTQnIHZpZXdCb3g9JzAgMCAxNCAxNCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48dGl0bGU+d2hpdGU8L3RpdGxlPjxwYXRoIGQ9J001LjM3OCAxMS4zN0wyIDcuNTlsMS40MzgtMS4yODZMNS4zNzQgOC40N2w1LjE4NS01Ljg0TDEyIDMuOTFsLTYuNjIyIDcuNDYnIGZpbGw9JyNmZmYnLz48L3N2Zz4=');
            background-position: center;
            background-repeat: no-repeat;
        }
        > input:hover + .todo__status-visible,
        > input:focus + .todo__status-visible {
            border-color: var(--todo-status-border);
        }
        > input:hover:checked + .todo__status-visible,
        > input:focus:checked + .todo__status-visible {
            border-color: var(--success-color);
        }
    }

    &__delete {
        margin-left: auto;
    }

    &__btn-del {
        border: 0;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        outline: 0;

        svg {
            display: block;
            width: 2rem;
            height: 2rem;
            fill: var(--card-border);
            transition-property: fill;

            &:hover,
            &:focus {
                fill: var(--error-color);
            }
        }
    }
}
</style>
