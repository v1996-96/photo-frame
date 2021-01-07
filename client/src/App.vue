<template>
    <v-app>
        <navigation />

        <v-main class="main">
            <router-view v-if="areAccountsLoaded && areSettingsLoaded" />
            <v-container v-else class="pt-4">
                <v-alert prominent type="error">
                    <v-row align="center">
                        <v-col class="grow">
                            Произошла какая-то ошибка :(
                        </v-col>
                        <v-col class="shrink">
                            <v-btn @click="loadPrerequisites">Перезагрузить</v-btn>
                        </v-col>
                    </v-row>
                </v-alert>
            </v-container>
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
        loadPrerequisites() {
            this.loadAccounts();
            this.loadSettings();
        },
    },
    created() {
        this.loadPrerequisites();
    },
};
</script>

<style scoped>
.main {
    background-image: url(./assets/sunrise.jpg);
    background-size: cover;
    max-height: 100vh;
    overflow-y: auto;
}
</style>
