<template>
    <div class="flex flex-col">
        <h1 class="text-6xl font-bold mb-6">Settings</h1>
        <label class="text-lg">Length of password/passphrase</label>
        <VueSlider
            v-model="value.length"
            :min="1"
            :max="64"
            :process-style="{ background: barColour }"
            tooltip="hover"
            :tooltip-style="{ background: barColour }"
            class="my-6"
        />
        <label class="inline-flex items-center mt-3 text-lg">
            <input
                v-model="value.upperCase"
                type="checkbox"
                class="form-checkbox h-5 w-5 focus:ring-1 focus:ring-current"
                :class="settingsStyles"
            /><span class="ml-2 text-gray-700">Uppercase</span>
        </label>
        <label class="inline-flex items-center mt-3 text-lg">
            <input
                v-model="value.lowerCase"
                type="checkbox"
                class="form-checkbox h-5 w-5 focus:ring-1 focus:ring-current"
                :class="settingsStyles"
            /><span class="ml-2 text-gray-700">Lowercase</span>
        </label>
        <label class="inline-flex items-center mt-3 text-lg">
            <input
                v-model="value.digits"
                type="checkbox"
                class="form-checkbox h-5 w-5 focus:ring-1 focus:ring-current"
                :class="settingsStyles"
            /><span class="ml-2 text-gray-700">Numbers</span>
        </label>
        <label class="inline-flex items-center mt-3 text-lg">
            <input
                v-model="value.specialChars"
                type="checkbox"
                class="form-checkbox h-5 w-5 focus:ring-1 focus:ring-current"
                :class="settingsStyles"
            /><span class="ml-2 text-gray-700">Symbols</span>
        </label>
        <label class="inline-flex items-center mt-3 text-lg">
            <input
                v-model="value.noSimilarChars"
                type="checkbox"
                class="form-checkbox h-5 w-5 focus:ring-1 focus:ring-current"
                :class="settingsStyles"
            /><span class="ml-2 text-gray-700">No similar characters (ex. i, I, l, 0, O)</span>
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default Vue.extend({
    name: 'Settings',
    components: {
        VueSlider,
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
        strength: {
            type: Number,
            required: true,
            default: 4,
        },
    },
    computed: {
        settingsStyles(): { [key: string]: boolean } {
            return {
                'text-red-600': this.strength === 0,
                'text-red-700': this.strength === 1,
                'text-yellow-600': this.strength === 2,
                'text-green-600': this.strength === 3,
                'text-green-700': this.strength === 4,
            };
        },
        barColour(): string {
            let colour = '';
            switch (this.strength) {
                case 0:
                    colour = '#DC2626';
                    break;
                case 1:
                    colour = '#B91C1C';
                    break;
                case 2:
                    colour = '#D97706';
                    break;
                case 3:
                    colour = '#059669';
                    break;
                case 4:
                    colour = '#047857';
                    break;
                default:
                    colour = '#047857';
                    break;
            }
            return colour;
        },
    },
});
</script>
