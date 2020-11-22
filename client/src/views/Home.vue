<template>
    <v-container class="pt-4">
        <h2 class="text-h2 mb-2">{{ welcomeMsg }}</h2>
    </v-container>
</template>

<script>
import { getWelcomeMsg } from '@/utils/date';

export default {
    name: 'Home',
    computed: {
        welcomeMsg() {
            return getWelcomeMsg();
        },
    },
};
</script>
