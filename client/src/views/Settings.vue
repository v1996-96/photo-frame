<template>
    <v-container class="pt-4">
        <h2 class="text-h2 mb-10">Настройки</h2>

        <v-row>
            <v-col cols="4">
                <card-link to="/auth">
                    <template #icon>
                        <v-icon size="40">mdi-account-multiple</v-icon>
                    </template>
                    <span class="text-body-1">Аккаунты</span>
                </card-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CardLink from '@/components/CardLink';

export default {
    name: 'Settings',
    components: { CardLink },
};
</script>
