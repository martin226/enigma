<template>
    <div id="app" class="flex flex-col min-h-screen">
        <div
            class="
                py-16
                h-full
                flex flex-col
                gap-4
                justify-center
                items-center
                text-white text-center
                transition-colors
                duration-500
            "
            :class="passwordBackground"
        >
            <Password ref="password" v-model="password" />
            <div class="mt-6 flex flex-row gap-4">
                <img
                    ref="generate"
                    src="@/assets/svg/refresh.svg"
                    class="w-10 h-10 filter invert cursor-pointer"
                    alt="refresh"
                    @dragstart.prevent="dragStart"
                    @click="
                        generatePassword();
                        rotateGenerate();
                    "
                />
                <img
                    :src="require('@/assets/svg/' + clipboardSvg)"
                    class="w-10 h-10 filter invert cursor-pointer"
                    alt="clipboard"
                    @dragstart.prevent="dragStart"
                    @click="
                        copyPassword();
                        changeClipboard();
                    "
                />
            </div>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-2 p-10 h-full bg-gray-100">
            <div class="p-10">
                <PasswordInfo
                    v-if="passwordInfo.password !== undefined"
                    :password-info="passwordInfo"
                />
            </div>
            <div class="p-10">
                <Settings v-model="settings" :strength="passwordInfo.score" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import zxcvbn from 'zxcvbn';
import debounce from 'lodash.debounce';
import Password from './components/Password.vue';
import PasswordInfo from './components/PasswordInfo.vue';
import Settings from './components/Settings.vue';
import { GeneratePassword } from './lib/generator';
import copyTextToClipboard from './lib/clipboard';

export default Vue.extend({
    name: 'App',
    components: {
        Password,
        PasswordInfo,
        Settings,
    },
    data() {
        return {
            password: '',
            settings: {
                length: 16,
                upperCase: true,
                lowerCase: true,
                digits: true,
                specialChars: true,
            },
            passwordInfo: {
                score: 4,
            },
            rotateGenerateTimeout: 0,
            changeClipboardTimeout: 0,
            clipboardSvg: 'clipboard.svg',
        };
    },
    computed: {
        passwordBackground(): { [key: string]: boolean } {
            const strength = this.passwordInfo.score;
            return {
                'bg-red-700': strength === 0,
                'bg-red-800': strength === 1,
                'bg-yellow-700': strength === 2,
                'bg-green-700': strength === 3,
                'bg-green-800': strength === 4,
            };
        },
    },
    watch: {
        password(newPassword) {
            debounce(() => {
                const passwordInfo = zxcvbn(newPassword);
                this.passwordInfo = passwordInfo;
            }, 100)();
        },
    },
    mounted() {
        this.generatePassword();
        this.focusPassword();
    },
    methods: {
        copyPassword() {
            copyTextToClipboard(this.password);
        },
        focusPassword() {
            (this.$refs.password as Vue & { $el: HTMLElement }).$el.focus();
        },
        generatePassword() {
            const { length, upperCase, lowerCase, digits, specialChars } = this.settings;
            this.password = GeneratePassword(length, upperCase, lowerCase, digits, specialChars);
        },
        rotateGenerate() {
            if (this.rotateGenerateTimeout !== 0) return;
            const el = this.$refs.generate as HTMLElement;
            el.classList.add('rotate');
            this.rotateGenerateTimeout = setTimeout(() => {
                el.classList.remove('rotate');
                this.rotateGenerateTimeout = 0;
            }, 200);
        },
        changeClipboard() {
            if (this.changeClipboardTimeout !== 0) return;
            this.clipboardSvg = 'clipboard-check.svg';
            this.changeClipboardTimeout = setTimeout(() => {
                this.clipboardSvg = 'clipboard.svg';
                this.changeClipboardTimeout = 0;
            }, 1500);
        },
    },
});
</script>

<style scoped>
@-moz-keyframes rotate {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@-webkit-keyframes rotate {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes rotate {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
.rotate {
    -webkit-animation: rotate 0.2s ease-in-out;
    -moz-animation: rotate 0.2s ease-in-out;
    animation: rotate 0.2s ease-in-out;
}
</style>
