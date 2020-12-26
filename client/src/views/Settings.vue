<template>
    <v-container class="pt-4">
        <h2 class="text-h2 mb-10">Настройки</h2>

        <backlight />

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

export default {
    name: 'Settings',
    components: { Accounts, Backlight },
};
</script>
