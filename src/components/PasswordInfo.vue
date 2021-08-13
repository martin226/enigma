<template>
    <div>
        <div
            class="
                bg-indigo-50
                dark:bg-indigo-800
                border-l-8 border-indigo-900
                mb-2
                dark:bg-opacity-10
            "
        >
            <div class="flex items-center">
                <div class="p-2">
                    <div class="flex items-center">
                        <div class="ml-2">
                            <img
                                v-if="passwordInfo.score < 3"
                                src="@/assets/svg/sad.svg"
                                class="h-8 w-8 mr-2 cursor-pointer dark:filter dark:invert"
                                alt="sad"
                                @dragstart.prevent
                            />
                            <img
                                v-else
                                src="@/assets/svg/happy.svg"
                                class="h-8 w-8 mr-2 cursor-pointer dark:filter dark:invert"
                                alt="happy"
                                @dragstart.prevent
                            />
                        </div>
                        <p
                            class="
                                px-6
                                py-4
                                text-indigo-900
                                dark:text-indigo-50
                                font-semibold
                                text-2xl
                            "
                        >
                            Password Score: {{ passwordInfo.score }}/4
                        </p>
                    </div>
                    <p class="px-16 mb-4 text-lg font-bold text-indigo-500 dark:text-indigo-200">
                        <span v-if="passwordInfo.score === 0">Too guessable: risky password</span>
                        <span v-if="passwordInfo.score === 1"
                            >Very guessable: protection from throttled online attacks</span
                        >
                        <span v-if="passwordInfo.score === 2"
                            >Somewhat guessable: protection from unthrottled online attacks</span
                        >
                        <span v-if="passwordInfo.score === 3"
                            >Safely unguessable: moderate protection from offline slow-hash
                            scenario</span
                        >
                        <span v-if="passwordInfo.score === 4"
                            >Very unguessable: strong protection from offline slow-hash
                            scenario</span
                        >
                    </p>
                </div>
            </div>
        </div>

        <div
            v-if="passwordInfo.feedback.warning"
            class="bg-red-50 dark:bg-red-800 border-l-8 border-red-900 mb-2 dark:bg-opacity-10"
        >
            <div class="flex items-center">
                <div class="p-2">
                    <div class="flex items-center">
                        <div class="ml-2">
                            <img
                                src="@/assets/svg/x-circle.svg"
                                class="h-8 w-8 mr-2 cursor-pointer dark:filter dark:invert"
                                alt="x-circle"
                                @dragstart.prevent
                            />
                        </div>
                        <p class="px-6 py-4 text-red-900 dark:text-red-50 font-semibold text-2xl">
                            Warning
                        </p>
                    </div>
                    <p class="px-16 mb-4 text-lg font-bold text-red-500 dark:text-red-50">
                        {{ passwordInfo.feedback.warning }}
                    </p>
                </div>
            </div>
        </div>

        <div
            class="
                bg-yellow-50
                dark:bg-yellow-800
                border-l-8 border-yellow-900
                mb-2
                dark:bg-opacity-10
            "
        >
            <div class="flex items-center">
                <div class="p-2">
                    <div class="flex items-center">
                        <div class="ml-2">
                            <img
                                src="@/assets/svg/information.svg"
                                class="h-8 w-8 mr-2 cursor-pointer dark:filter dark:invert"
                                alt="information"
                                @dragstart.prevent
                            />
                        </div>
                        <p
                            class="
                                px-6
                                py-4
                                text-yellow-900
                                dark:text-yellow-50
                                font-semibold
                                text-2xl
                            "
                        >
                            Time to crack
                        </p>
                    </div>
                    <ul class="px-16 mb-4 font-bold text-yellow-500 dark:text-yellow-200 text-lg">
                        <li>
                            Throttled online attack:
                            {{ passwordInfo.crack_times_display.online_throttling_100_per_hour }}
                        </li>
                        <li>
                            Unthrottled online attack:
                            {{
                                passwordInfo.crack_times_display.online_no_throttling_10_per_second
                            }}
                        </li>
                        <li>
                            Offline attack, slow hash, many cores:
                            {{
                                passwordInfo.crack_times_display.offline_slow_hashing_1e4_per_second
                            }}
                        </li>
                        <li>
                            Offline attack, fast hash, many cores:
                            {{
                                passwordInfo.crack_times_display
                                    .offline_fast_hashing_1e10_per_second
                            }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div
            class="
                bg-green-50
                dark:bg-green-800
                border-l-8 border-green-900
                mb-2
                dark:bg-opacity-10
            "
        >
            <div class="flex items-center">
                <div class="p-2">
                    <div class="flex items-center">
                        <div class="ml-2">
                            <img
                                src="@/assets/svg/checkmark.svg"
                                class="h-8 w-8 mr-2 cursor-pointer dark:filter dark:invert"
                                alt="checkmark"
                                @dragstart.prevent
                            />
                        </div>
                        <p
                            class="
                                px-6
                                py-4
                                text-green-900
                                dark:text-green-50
                                font-semibold
                                text-2xl
                            "
                        >
                            Try the following suggestions!
                        </p>
                    </div>
                    <ul
                        v-if="passwordInfo.feedback.suggestions.length > 0"
                        class="
                            px-16
                            mb-4
                            list-disc
                            text-lg
                            font-bold
                            text-green-500
                            dark:text-green-200
                        "
                    >
                        <li
                            v-for="suggestion in passwordInfo.feedback.suggestions"
                            :key="suggestion"
                        >
                            {{ suggestion }}
                        </li>
                    </ul>
                    <p
                        v-else
                        class="px-16 mb-4 text-lg font-bold text-green-500 dark:text-green-200"
                    >
                        No suggestions available. Great job!
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'PasswordInfo',
    props: {
        passwordInfo: {
            type: Object,
            required: true,
        },
    },
});
</script>
