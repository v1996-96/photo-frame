<template>
    <v-dialog fullscreen :value="value" @input="handleToggleDialog">
        <v-card>
            <v-carousel v-if="images.length" hide-delimiters continuous height="600">
                <v-carousel-item v-for="image in images" :key="image._id" :src="image.proxySrc" />
            </v-carousel>
        </v-card>
    </v-dialog>
</template>

<script>
import { api } from '@/api';

export default {
    name: 'GalleryCarousel',
    props: {
        value: Boolean,
    },
    data: () => ({
        images: [],
    }),
    methods: {
        handleToggleDialog(value) {
            this.$emit('input', value);
        },
        async getPreviewsList() {
            const response = await api.gallery.getPreviewsList();
            const images = response.data?.result?.images || [];

            this.images = images.map(image => ({
                ...image,
                proxySrc: `/api/gallery/previews/image?imageId=${image._id}&accountId=${image.account}`,
            }));
        },
    },
    created() {
        this.getPreviewsList();
    },
};
</script>
