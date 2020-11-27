<template>
    <v-virtual-scroll v-if="images.length" :items="images" height="600" item-height="174">
        <template #default="{ item }">
            <v-row :key="item[0].imageId">
                <v-col
                    v-for="image in item"
                    :key="image.imageId"
                    class="d-flex child-flex"
                    cols="3"
                >
                    <v-img :src="image.proxySrc" height="150" class="grey lighten-2" />
                </v-col>
            </v-row>
        </template>
    </v-virtual-scroll>
</template>

<script>
import { api } from '@/api';
import { splitEvery } from 'ramda';

export default {
    name: 'ImagesList',
    data: () => ({
        images: [],
    }),
    methods: {
        async getPreviewsList() {
            const response = await api.gallery.getPreviewsList();
            const images = response.data?.result?.images || [];
            const imagesWithSrc = images.map(image => ({
                ...image,
                proxySrc: `/api/gallery/previews/image?imageId=${image.imageId}&accountId=${image.accountId}`,
            }));

            this.images = splitEvery(4, imagesWithSrc);
        },
    },
    created() {
        this.getPreviewsList();
    },
};
</script>
