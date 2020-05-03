<template>
    <div class="toggle-wrapper">
        <label class="toggle">
            <input type="checkbox" :checked="mode === 'dark' ? 'checked' : false" @change="$emit('toggle')" />
            <span class="toggler round"></span>
        </label>
    </div>
</template>

<script>
export default {
    props: ['mode']
}
</script>

<style lang="scss">
.toggle-wrapper {
    margin-left: auto;
}

.toggle {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 25px;
}
.toggle input {
    opacity: 0;
    width: 0;
    height: 0;
}
.toggler {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--toggle-bg);
    transition: 0.4s;

    &:hover {
        background: var(--nav-color);
    }
}
.toggler::before {
    position: absolute;
    content: '';
    height: 17px;
    width: 17px;
    left: 4px;
    bottom: 4px;
    background: var(--nav-bg);
    transition: 0.4s;
}
input:checked + .toggler {
    background: var(--toggle-bg);

    &:hover {
        background: $white;
    }
}
input:focus + .toggler {
    box-shadow: 0 0 2px var(--toggle-bg);
}
input:checked + .toggler:before {
    transform: translateX(26px);
}
.toggler.round {
    border-radius: 50px;
}
.toggler.round:before {
    border-radius: 50%;
}
</style>
