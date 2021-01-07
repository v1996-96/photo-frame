<template>
    <v-container class="pt-4">
        <page-heading message="Настройки" />

        <v-card>
            <v-card-text class="mb-4">
                <backlight />
            </v-card-text>
        </v-card>

        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    Аккаунты
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <accounts />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
import Backlight from '@/components/Backlight';
import Accounts from '@/components/Accounts';
import PageHeading from '@/components/PageHeading';

export default {
    name: 'Settings',
    components: { Accounts, Backlight, PageHeading },
};
</script>
