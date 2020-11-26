<template>
    <v-container class="pt-4">
        <h2 class="text-h2 mb-10">Галерея</h2>

        <div class="mb-10">
            <v-btn color="accent" x-large class="mr-4" @click="getPreviewsList">
                Показать фоточки
            </v-btn>
            <v-btn color="info" x-large class="mr-4" @click="showSettings = true">
                Настроить
            </v-btn>
            <v-btn x-large @click="loadPreviews">Сбросить кэш</v-btn>
        </div>

        <v-row>
            <v-col
                v-for="file in previewsList"
                :key="file.resourceId"
                class="d-flex child-flex"
                cols="4"
            >
                <v-img :src="file.preview" class="grey lighten-2" />
            </v-col>
        </v-row>

        <div v-if="showSettings">
            <v-tabs v-model="selectedAccount">
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

            <v-tabs-items v-model="selectedAccount">
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
    </v-container>
</template>

<script>
import { api } from '@/api';
import { helpers as authHelpers } from '@/store/modules/auth';
import DiskStructure from '@/components/DiskStructure';

export default {
    name: 'Gallery',
    components: { DiskStructure },
    data: () => ({
        showSettings: false,
        selectedAccount: null,
        selectedPaths: {},
        previewsList: [],
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
        loadPreviews() {
            api.gallery.loadPreviews();
        },
        async getPreviewsList() {
            const response = await api.gallery.getPreviewsList();
            this.previewsList = response.data?.result?.previewsList || {};

            console.log(this.previewsList);
        },
    },
    created() {
        this.loadSelectedPaths();
    },
};
</script>
