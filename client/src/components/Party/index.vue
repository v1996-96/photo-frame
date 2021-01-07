<template>
    <div @click="loadParty">
        <v-progress-circular v-if="isLoading" indeterminate color="primary" size="40" />

        <v-icon v-if="!isLoading && !parrotLink" size="60" light>mdi-image-multiple</v-icon>

        <v-img
            v-if="!isLoading && parrotLink"
            contain
            max-height="60"
            max-width="60"
            :src="parrotLink"
        />
    </div>
</template>

<script>
import { api } from '@/api';

export default {
    name: 'Party',
    data: () => ({
        parrotLink: null,
        isLoading: false,
    }),
    methods: {
        async loadParty() {
            try {
                this.isLoading = true;
                const response = await api.party.get();
                this.parrotLink = response.data?.result?.parrotLink;
                this.isLoading = false;
            } catch (error) {
                this.parrotLink = null;
                this.isLoading = false;
            }
        },
    },
    created() {
        this.loadParty();
    },
};
</script>
