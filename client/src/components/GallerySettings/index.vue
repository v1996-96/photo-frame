<template>
    <div>
        <v-tabs v-model="selectedTab">
            <v-tab>
                Выбранные папки
            </v-tab>
            <v-tab v-for="account in accounts" :key="account.id">
                <v-avatar color="primary" size="30" class="mr-3">
                    <img :src="account.avatarUrl" />
                </v-avatar>
                {{ account.realName }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="selectedTab">
            <v-tab-item>
                <template v-for="accountId in Object.keys(selectedPaths)">
                    <v-list
                        v-if="selectedPaths[accountId] && selectedPaths[accountId].length"
                        :key="accountId"
                        subheader
                        dense
                    >
                        <v-subheader>{{ getAccountById(accountId).realName }}</v-subheader>

                        <v-list-item v-for="path in selectedPaths[accountId]" :key="path">
                            <v-list-item-content>{{ path }}</v-list-item-content>
                        </v-list-item>
                    </v-list>
                </template>
            </v-tab-item>
            <v-tab-item v-for="account in accounts" :key="account.accountId">
                <disk-structure
                    :selected-paths="selectedPaths[account.accountId]"
                    :account="account"
                    @change="saveSelectedPaths($event, account.accountId)"
                />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import { api } from '@/api';
import { helpers as authHelpers } from '@/store/modules/auth';
import DiskStructure from '@/components/DiskStructure';

export default {
    name: 'GallerySettings',
    components: { DiskStructure },
    data: () => ({
        selectedTab: null,
        selectedPaths: {},
    }),
    computed: {
        ...authHelpers.mapState(['accounts']),
        ...authHelpers.mapGetters(['isAuthorized', 'getAccountById']),
    },
    methods: {
        async saveSelectedPaths(paths, accountId) {
            this.$set(this.selectedPaths, accountId, paths);

            await api.gallery.setSelectedPaths({ selectedPaths: this.selectedPaths });
        },
        async loadSelectedPaths() {
            const response = await api.gallery.getSelectedPaths();
            this.selectedPaths = response.data?.result?.selectedPaths || {};
        },
    },
    created() {
        this.loadSelectedPaths();
    },
};
</script>
