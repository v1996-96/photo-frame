<template>
    <v-app>
        <navigation />

        <v-main>
            <router-view v-if="areAccountsLoaded" />
        </v-main>
    </v-app>
</template>

<script>
import Navigation from '@/components/Navigation';
import { helpers as authHelpers } from '@/store/modules/auth';

export default {
    name: 'App',
    components: { Navigation },
    computed: {
        ...authHelpers.mapGetters(['areAccountsLoaded']),
    },
    methods: {
        ...authHelpers.mapActions(['loadAccounts']),
    },
    created() {
        this.loadAccounts();
    },
};
</script>
