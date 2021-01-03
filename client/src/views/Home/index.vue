<template>
    <v-container class="pt-4">
        <h2 class="text-h2 mb-10">{{ welcomeMsg }}</h2>

        <v-card v-if="Boolean(quote)" @click="loadQuote">
            <v-card-text>
                <div class="text-h5">{{ quote.quoteText }}</div>
                <div v-if="quote.quoteAuthor" class="mt-3">{{ quote.quoteAuthor }}</div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { api } from '@/api';
import { getWelcomeMsg } from '@/utils/date';

export default {
    name: 'Home',
    data: () => ({
        quote: null,
    }),
    computed: {
        welcomeMsg() {
            return getWelcomeMsg();
        },
    },
    methods: {
        async loadQuote() {
            const response = await api.forismatic.get();
            this.quote = response.data?.result;
        },
    },
    created() {
        this.loadQuote();
    },
};
</script>
