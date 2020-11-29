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
                <template v-for="accountId in Object.keys(groupedPaths)">
                    <v-list
                        v-if="groupedPaths[accountId] && groupedPaths[accountId].length"
                        :key="accountId"
                        subheader
                        dense
                    >
                        <v-subheader>{{ getAccountById(accountId).realName }}</v-subheader>

                        <v-list-item
                            v-for="selectedPath in groupedPaths[accountId]"
                            :key="selectedPath.path"
                        >
                            <v-list-item-content>{{ selectedPath.path }}</v-list-item-content>
                        </v-list-item>
                    </v-list>
                </template>
            </v-tab-item>
            <v-tab-item v-for="account in accounts" :key="account.accountId">
                <disk-structure
                    :selected-paths="getPaths(groupedPaths[account._id])"
                    :account="account"
                    @change="saveSelectedPaths($event, account._id)"
                />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import { groupBy, prop } from 'ramda';
import { api } from '@/api';
import { helpers as authHelpers } from '@/store/modules/auth';
import DiskStructure from '@/components/DiskStructure';

export default {
    name: 'GallerySettings',
    components: { DiskStructure },
    data: () => ({
        selectedTab: null,
        selectedPaths: [],
    }),
    computed: {
        ...authHelpers.mapState(['accounts']),
        ...authHelpers.mapGetters(['isAuthorized', 'getAccountById']),
        groupedPaths() {
            return groupBy(prop('account'), this.selectedPaths);
        },
    },
    methods: {
        getPaths(diskPathsList) {
            return (diskPathsList && diskPathsList.map(({ path }) => path)) || [];
        },
        async saveSelectedPaths(paths, accountId) {
            // Удаляем все старые пути
            this.selectedPaths = this.selectedPaths.filter(({ account }) => account !== accountId);
            const newSelectedPaths = paths.map(path => ({ path, account: accountId }));
            this.selectedPaths = this.selectedPaths.concat(newSelectedPaths);

            await api.gallery.setSelectedPaths({ selectedPaths: this.selectedPaths });
        },
        async loadSelectedPaths() {
            const response = await api.gallery.getSelectedPaths();
            this.selectedPaths = response.data?.result?.selectedPaths || [];
        },
    },
    created() {
        this.loadSelectedPaths();
    },
};
</script>
