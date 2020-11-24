<template>
    <v-container class="pt-4">
        <h2 class="text-h2 mb-10">Галерея</h2>

        <v-treeview
            v-if="isAuthorized"
            :items="items"
            :load-children="fetchStructure"
            :open.sync="open"
            activatable
            open-on-click
            transition
        />
    </v-container>
</template>

<script>
import { api } from '@/api';
import { helpers as authHelpers } from '@/store/modules/auth';

export default {
    name: 'Gallery',
    data: () => ({
        open: [],
        items: [],
    }),
    computed: {
        ...authHelpers.mapState(['accounts']),
        ...authHelpers.mapGetters(['isAuthorized']),
        account() {
            return this.isAuthorized && this.accounts[0];
        },
    },
    methods: {
        fetchStructure(item) {
            item.children = item.children.concat([
                { id: 2, name: 'kek' },
                { id: 3, name: 'kek' },
            ]);

            return Promise.resolve(item);
        },
        async fetchData(path = '/') {
            console.log(this.account);

            const result = await api.gallery.structure({
                userId: this.account.userId,
                limit: 10000,
                offset: 0,
                path,
            });

            console.log(result);

            return result;
        },
    },
    created() {
        this.fetchData();
    },
};
</script>
