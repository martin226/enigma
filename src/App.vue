<template>
    <div id="app" class="flex flex-col text-center h-screen">
        <div
            ref="passwordSection"
            class="
                h-2/5
                bg-green-800
                flex flex-col
                gap-4
                justify-center
                items-center
                text-white text-center
            "
        >
            <Password ref="password" v-model="password" />
            <div class="mt-6">
                <Btn
                    class="bg-white text-gray-800 hover:bg-gray-300"
                    text="Generate"
                    clicked="Generated!"
                    @click.native="
                        generatePassword();
                        bounceAnimation($event);
                    "
                />
                <Btn
                    class="bg-white text-gray-800 hover:bg-gray-300"
                    text="Copy"
                    clicked="Copied!"
                    @click.native="
                        copyPassword();
                        bounceAnimation($event);
                    "
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import zxcvbn from 'zxcvbn';
import debounce from 'lodash.debounce';
import Btn from './components/Button.vue';
import Password from './components/Password.vue';
import { GeneratePassword } from './lib/generator';
import copyTextToClipboard from './lib/clipboard';

export default Vue.extend({
    name: 'App',
    components: {
        Btn,
        Password,
    },
    data() {
        return {
            password: '',
            length: 16,
            upperCase: true,
            lowerCase: true,
            digits: true,
            specialChars: true,
            strength: 4,
        };
    },
    watch: {
        password(newPassword) {
            debounce(() => {
                const passwordInfo = zxcvbn(newPassword);
                this.strength = passwordInfo.score;
                this.strengthColour();
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
            this.password = GeneratePassword(
                this.length,
                this.upperCase,
                this.lowerCase,
                this.digits,
                this.specialChars
            );
        },
        bounceAnimation(event: Event) {
            if (!event) return;
            const el = event.target as HTMLElement;
            el.classList.add('bounce');
            setTimeout(() => el.classList.remove('bounce'), 1000);
        },
        setColour(colour: string) {
            const passwordSection = this.$refs.passwordSection as Vue & {
                classList: Element['classList'];
            };
            // Remove existing colours
            for (let i = 0; i < passwordSection.classList.length; i += 1) {
                if (passwordSection.classList[i].startsWith('bg-')) {
                    passwordSection.classList.remove(passwordSection.classList[i]);
                }
            }
            passwordSection.classList.add(colour);
        },
        strengthColour() {
            switch (this.strength) {
                case 0:
                    this.setColour('bg-red-800');
                    break;
                case 1:
                    this.setColour('bg-red-700');
                    break;
                case 2:
                    this.setColour('bg-yellow-700');
                    break;
                case 3:
                    this.setColour('bg-green-700');
                    break;
                case 4:
                    this.setColour('bg-green-800');
                    break;
                default:
                    this.setColour('bg-green-800');
                    break;
            }
        },
    },
});
</script>

<style scoped>
@keyframes bounce {
    0% {
        -webkit-transform: translateY(0px);
    }
    30% {
        -webkit-transform: translateY(-20px);
    }
    60% {
        -webkit-transform: translateY(0px);
    }
    70% {
        -webkit-transform: translateY(-5px);
    }
    100% {
        -webkit-transform: translateY(0);
    }
}

.bounce {
    animation: bounce 0.8s ease-in-out;
}
</style>
