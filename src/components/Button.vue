<template>
    <button class="py-2 px-7 m-2 font-semibold rounded-lg transition duration-200 cursor-pointer">
        {{ text }}
    </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Btn',
    props: {
        text: {
            type: String,
            required: true,
            default: 'Button',
        },
    },
});
</script>
