<template>
    <input
        :type="showPassword ? 'text' : 'password'"
        spellcheck="false"
        placeholder="Enter a password"
        :value="value"
        class="
            text-center text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            xl:text-8xl
            bg-transparent
            border-none
            outline-none
            font-bold
            focus:bg-transparent focus:border-none focus:outline-none
            overflow-ellipsis
        "
        @input="$emit('input', $event.target.value)"
    />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Password',
    props: {
        value: {
            type: String,
            required: true,
        },
        showPassword: {
            type: Boolean,
            required: true,
        },
    },
});
</script>

<style scoped>
::placeholder {
    color: rgba(233, 233, 233, 0.75);
    opacity: 1;
}

:-ms-input-placeholder {
    color: rgba(233, 233, 233, 0.75);
}

::-ms-input-placeholder {
    color: rgba(233, 233, 233, 0.75);
}
</style>
