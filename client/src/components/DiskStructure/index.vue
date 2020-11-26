<template>
    <v-treeview v-if="account" :items="items" :load-children="fetchChildren" dense transition>
        <template #prepend="{ item }">
            <v-simple-checkbox
                color="red"
                :value="isSelected(item)"
                @input="handleSelect(item, $event)"
            />
        </template>
    </v-treeview>
</template>

<script>
import { api } from '@/api';

export default {
    name: 'DiskStructure',
    model: {
        prop: 'selectedPaths',
        event: 'change',
    },
    props: {
        account: {
            type: Object,
            required: true,
        },
        selectedPaths: {
            type: Array,
            default: () => [],
        },
    },
    data: () => ({
        items: [],
    }),
    watch: {
        async account() {
            if (this.account) {
                this.items = await this.fetchDirs();
            }
        },
    },
    methods: {
        isSelected(item) {
            return this.selectedPaths.includes(item.path);
        },
        handleSelect(item, isSelected) {
            let newSelectedPaths = this.selectedPaths;

            if (isSelected) {
                newSelectedPaths = [...this.selectedPaths, item.path];
            } else {
                newSelectedPaths = this.selectedPaths.filter(path => path !== item.path);
            }

            this.$emit('change', newSelectedPaths);
        },
        fetchChildren(item) {
            return this.fetchDirs(item.path).then(children => {
                item.children = children;

                return item;
            });
        },
        async fetchDirs(path = '/') {
            const response = await api.gallery.structure({
                accountId: this.account.accountId,
                limit: 10000,
                offset: 0,
                path,
            });

            const rawItems = response.data?.result?.embedded?.items || [];

            const items = rawItems.map(item => ({
                id: item.path,
                name: item.name,
                path: item.path,
                created: item.created,
                modified: item.modified,
                type: item.type,
                children: [],
            }));

            const dirs = items.filter(({ type }) => type === 'dir');

            return dirs;
        },
    },
    async created() {
        if (this.account) {
            this.items = await this.fetchDirs();
        }
    },
};
</script>
