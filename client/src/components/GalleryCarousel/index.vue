<template>
    <v-carousel v-if="images.length" hide-delimiters continuous height="600">
        <v-carousel-item v-for="image in images" :key="image.imageId" :src="image.proxySrc" />
    </v-carousel>
</template>

<script>
import { api } from '@/api';

export default {
    name: 'GalleryCarousel',
    data: () => ({
        images: [],
    }),
    methods: {
        async getPreviewsList() {
            const response = await api.gallery.getPreviewsList();
            const images = response.data?.result?.images || [];

            this.images = images.map(image => ({
                ...image,
                proxySrc: `/api/gallery/previews/image?imageId=${image.imageId}&accountId=${image.accountId}`,
            }));
        },
    },
    created() {
        this.getPreviewsList();
    },
};
</script>
