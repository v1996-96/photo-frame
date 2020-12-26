<template>
    <v-app>
        <navigation />

        <v-main>
            <router-view v-if="areAccountsLoaded && areSettingsLoaded" />
            <div v-else>
                Произошла какая-то ошибка :(
            </div>
        </v-main>
    </v-app>
</template>

<script>
import Navigation from '@/components/Navigation';
import { helpers as authHelpers } from '@/store/modules/auth';
import { helpers as settingsHelpers } from '@/store/modules/settings';

export default {
    name: 'App',
    components: { Navigation },
    computed: {
        ...authHelpers.mapGetters(['areAccountsLoaded']),
        ...settingsHelpers.mapGetters(['areSettingsLoaded']),
    },
    methods: {
        ...authHelpers.mapActions(['loadAccounts']),
        ...settingsHelpers.mapActions(['loadSettings']),
    },
    created() {
        this.loadAccounts();
        this.loadSettings();
    },
};
</script>
