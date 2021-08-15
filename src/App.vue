<template>
    <div id="app" class="flex flex-col min-h-screen">
        <div
            class="
                py-16
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
            <Password ref="password" v-model="password" :show-password="showPassword" />
            <div class="mt-6 flex flex-row gap-4">
                <img
                    ref="generate"
                    src="@/assets/svg/refresh.svg"
                    class="w-10 h-10 filter invert cursor-pointer"
                    alt="Generate password"
                    @dragstart.prevent
                    @click="
                        generatePassword();
                        rotateGenerate();
                    "
                />
                <img
                    v-tippy="{ trigger: 'click', arrow: true, wait: copyPassword }"
                    :content="clipboardTooltip"
                    src="@/assets/svg/clipboard.svg"
                    class="w-10 h-10 filter invert cursor-pointer focus:outline-none"
                    alt="Copy to clipboard"
                    @dragstart.prevent
                />
                <img
                    :src="
                        showPassword
                            ? require('@/assets/svg/eye.svg')
                            : require('@/assets/svg/eye-off.svg')
                    "
                    class="w-10 h-10 filter invert cursor-pointer focus:outline-none"
                    alt="Toggle password visibility"
                    @dragstart.prevent
                    @click="showPassword = !showPassword"
                />
            </div>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-2 p-10 flex-1 bg-gray=100 dark:bg-gray-800">
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
import GeneratePassword from './lib/generator';

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
                noSimilarChars: true,
                uniqueChars: true,
                noSequentialChars: true,
            },
            passwordInfo: {
                score: 4,
            },
            rotateGenerateTimeout: 0,
            clipboardSuccess: false,
            clipboardTooltip: '',
            showPassword: true,
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
        this.setTheme();
        this.generatePassword();
        this.focusPassword();
    },
    methods: {
        copyPassword(tippy: { show: () => void }) {
            this.$copyText(this.password).then(
                () => {
                    this.clipboardTooltip = 'Copied!';
                },
                () => {
                    this.clipboardTooltip = 'Press CTRL-C to copy';
                }
            );
            tippy.show();
        },
        focusPassword() {
            (this.$refs.password as Vue & { $el: HTMLElement }).$el.focus();
        },
        generatePassword() {
            const {
                length,
                upperCase,
                lowerCase,
                digits,
                specialChars,
                noSimilarChars,
                uniqueChars,
                noSequentialChars,
            } = this.settings;
            this.password = GeneratePassword(
                length,
                upperCase,
                lowerCase,
                digits,
                specialChars,
                noSimilarChars,
                uniqueChars,
                noSequentialChars
            );
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
        setTheme() {
            if (!['dark', 'light'].includes(localStorage.theme)) {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    localStorage.theme = 'dark';
                } else {
                    localStorage.theme = 'light';
                }
            }
            if (localStorage.theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
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
