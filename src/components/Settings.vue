<template>
    <div class="flex flex-col dark:text-gray-50">
        <div class="flex flex-row items-center justify-between">
            <h1 class="text-6xl font-bold mb-6">Settings</h1>
            <div class="w-14 h-8 mt-5 mx-auto sm:m-0">
                <input
                    id="dark-mode-toggle"
                    type="checkbox"
                    class="hidden"
                    onchange="document.documentElement.classList.toggle('dark')"
                    @change="toggleTheme()"
                />
                <label
                    for="dark-mode-toggle"
                    class="
                        w-full
                        h-full
                        bg-gray-800
                        dark:bg-white
                        rounded-full
                        p-1
                        flex
                        justify-between
                        cursor-pointer
                    "
                >
                    <span class="inline dark:hidden select-none">🌞</span>
                    <span
                        class="
                            w-6
                            h-6
                            rounded-full
                            bg-white
                            dark:bg-gray-800
                            block
                            float-right
                            dark:float-left
                        "
                    ></span>
                    <span class="hidden dark:inline select-none">🌛</span>
                </label>
            </div>
        </div>
        <label class="text-lg">Length of password</label>
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
            /><span class="ml-2">Uppercase</span>
        </label>
        <label class="inline-flex items-center mt-3 text-lg">
            <input
                v-model="value.lowerCase"
                type="checkbox"
                class="form-checkbox h-5 w-5 focus:ring-1 focus:ring-current"
                :class="settingsStyles"
            /><span class="ml-2">Lowercase</span>
        </label>
        <label class="inline-flex items-center mt-3 text-lg">
            <input
                v-model="value.digits"
                type="checkbox"
                class="form-checkbox h-5 w-5 focus:ring-1 focus:ring-current"
                :class="settingsStyles"
            /><span class="ml-2">Numbers</span>
        </label>
        <label class="inline-flex items-center mt-3 text-lg">
            <input
                v-model="value.specialChars"
                type="checkbox"
                class="form-checkbox h-5 w-5 focus:ring-1 focus:ring-current"
                :class="settingsStyles"
            /><span class="ml-2">Symbols</span>
        </label>
        <label class="inline-flex items-center mt-3 text-lg">
            <input
                v-model="value.noSimilarChars"
                type="checkbox"
                class="form-checkbox h-5 w-5 focus:ring-1 focus:ring-current"
                :class="settingsStyles"
            /><span class="ml-2">No similar characters (ex. i, I, l, 0, O)</span>
        </label>
        <label class="inline-flex items-center mt-3 text-lg">
            <input
                v-model="value.uniqueChars"
                type="checkbox"
                class="form-checkbox h-5 w-5 focus:ring-1 focus:ring-current"
                :class="settingsStyles"
            /><span class="ml-2">Don't use the same character more than once</span>
        </label>
        <label class="inline-flex items-center mt-3 text-lg">
            <input
                v-model="value.noSequentialChars"
                type="checkbox"
                class="form-checkbox h-5 w-5 focus:ring-1 focus:ring-current"
                :class="settingsStyles"
            /><span class="ml-2">Don't use sequential characters (ex. 123)</span>
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
    methods: {
        toggleTheme() {
            if (localStorage.theme === 'dark') {
                localStorage.theme = 'light';
            } else if (localStorage.theme === 'light') {
                localStorage.theme = 'dark';
            }
        },
    },
});
</script>
