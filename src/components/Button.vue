<template>
    <button
        class="py-2 w-28 m-2 font-semibold rounded-lg transition duration-200 cursor-pointer"
        @click="onClick()"
    >
        {{ buttonText }}
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
        clicked: {
            type: String,
            required: false,
            default: '✓',
        },
    },
    data() {
        return {
            buttonText: this.text,
        };
    },
    methods: {
        onClick() {
            if (this.buttonText === this.clicked) return;
            this.buttonText = this.clicked;
            setTimeout(() => {
                this.buttonText = this.text;
            }, 1000);
        },
    },
});
</script>
