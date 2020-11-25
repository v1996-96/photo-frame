<template>
    <v-container class="pt-4">
        <h2 class="text-h2 mb-10">Галерея</h2>

        <v-btn color="accent" x-large class="mb-10 mr-4">Показать фоточки</v-btn>
        <v-btn color="info" x-large class="mb-10 mr-4">Настроить</v-btn>
        <v-btn x-large class="mb-10">Сбросить кэш</v-btn>

        <v-tabs v-if="false" v-model="selectedAccount">
            <v-tab v-for="account in accounts" :key="account.id">
                <v-avatar color="primary" size="30" class="mr-3">
                    <img :src="account.avatarUrl" />
                </v-avatar>
                {{ account.realName }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-if="false" v-model="selectedAccount">
            <v-tab-item v-for="account in accounts" :key="account.id">
                <disk-structure v-model="selectedPathsByAccount[account.id]" :account="account" />
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script>
import { helpers as authHelpers } from '@/store/modules/auth';
import DiskStructure from '@/components/DiskStructure';

export default {
    name: 'Gallery',
    components: { DiskStructure },
    data: () => ({
        selectedAccount: null,
        selectedPathsByAccount: {},
    }),
    computed: {
        ...authHelpers.mapState(['accounts']),
        ...authHelpers.mapGetters(['isAuthorized']),
    },
    watch: {
        selectedPathsByAccount: {
            handler: value => {
                console.log(value);
            },
            deep: true,
        },
    },
};
</script>
