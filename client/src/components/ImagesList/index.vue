<template>
    <v-virtual-scroll v-if="images.length" :items="images" height="600" item-height="174">
        <template #default="{ item }">
            <v-row :key="item[0]._id">
                <v-col v-for="image in item" :key="image._id" class="d-flex child-flex" cols="3">
                    <delayed :wait="100">
                        <v-img :src="image.proxySrc" height="150" class="grey lighten-2" />
                    </delayed>
                </v-col>
            </v-row>
        </template>
    </v-virtual-scroll>
</template>

<script>
import { splitEvery } from 'ramda';
import { api } from '@/api';
import Delayed from '@/components/Delayed';

export default {
    name: 'ImagesList',
    components: { Delayed },
    data: () => ({
        images: [],
    }),
    methods: {
        async getPreviewsList() {
            const response = await api.gallery.getPreviewsList();
            const images = response.data?.result?.images || [];
            const imagesWithSrc = images.map(image => ({
                ...image,
                proxySrc: `/api/gallery/previews/image?imageId=${image._id}&accountId=${image.account}`,
            }));

            this.images = splitEvery(4, imagesWithSrc);
        },
    },
    created() {
        this.getPreviewsList();
    },
};
</script>
