<template>
    <v-container class="pt-4">
        <page-heading :message="welcomeMsg">
            <v-img contain max-height="60" max-width="60" :src="parrotLink" />
        </page-heading>

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
import PageHeading from '@/components/PageHeading';

export default {
    name: 'Home',
    components: { PageHeading },
    data: () => ({
        quote: null,
        parrotLink: null,
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
        async loadParty() {
            const response = await api.party.get();
            this.parrotLink = response.data?.result?.parrotLink;
        },
    },
    created() {
        this.loadQuote();
        this.loadParty();
    },
};
</script>
