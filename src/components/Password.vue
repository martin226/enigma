<template>
    <input
        type="text"
        spellcheck="false"
        :value="value"
        class="
            text-center text-3xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            xl:text-8xl
            bg-transparent
            border-none
            outline-none
            font-bold
            focus:bg-transparent focus:border-none focus:outline-none
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
    },
});
</script>
