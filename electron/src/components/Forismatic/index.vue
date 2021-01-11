<template>
    <v-card @click="loadQuote">
        <v-card-text v-if="isLoading">
            <v-skeleton-loader type="paragraph" />
        </v-card-text>

        <v-card-text v-if="!isLoading && Boolean(quote)">
            <div class="text-h5">{{ quote.quoteText }}</div>
            <div v-if="quote.quoteAuthor" class="mt-3">{{ quote.quoteAuthor }}</div>
        </v-card-text>
    </v-card>
</template>

<script>
import { api } from '@/api';

export default {
    name: 'Forismatic',
    data: () => ({
        quote: null,
        isLoading: false,
    }),
    methods: {
        async loadQuote() {
            try {
                this.isLoading = true;
                const response = await api.forismatic.get();
                this.quote = response.data?.result;
                this.isLoading = false;
            } catch (error) {
                this.quote = 'Ошибка загрузки';
                this.isLoading = false;
            }
        },
    },
    created() {
        this.loadQuote();
    },
};
</script>
