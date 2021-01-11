<template>
    <v-dialog fullscreen :value="value" @input="handleToggleDialog">
        <v-card>
            <v-carousel
                v-if="images.length"
                v-model="activeImage"
                hide-delimiters
                continuous
                height="600"
                :interval="interval"
                :cycle="shouldCycle"
                :show-arrows="false"
            >
                <v-carousel-item
                    v-for="image in images"
                    :key="image._id"
                    :src="image.proxySrc"
                    contain
                />
            </v-carousel>

            <img
                v-if="activeImage < images.length - 1"
                class="preload-image"
                :src="images[activeImage + 1].proxySrc"
            />

            <div class="overlay" @click="handleClickOverlay" />

            <v-bottom-sheet v-model="showControls" inset hide-overlay>
                <v-sheet class="sheet">
                    <div class="d-flex pa-3">
                        <v-btn icon @click="handleToggleDialog(false)">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>

                        <v-spacer />

                        <v-btn icon class="mr-3" @click="activeImage--">
                            <v-icon>mdi-rewind</v-icon>
                        </v-btn>
                        <v-btn icon class="mr-3" @click="shouldCycle = !shouldCycle">
                            <v-icon v-if="shouldCycle">mdi-pause</v-icon>
                            <v-icon v-else>mdi-play</v-icon>
                        </v-btn>
                        <v-btn icon @click="activeImage++">
                            <v-icon>mdi-fast-forward</v-icon>
                        </v-btn>
                    </div>
                </v-sheet>
            </v-bottom-sheet>
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
        showControls: false,
        shouldCycle: true,
        activeImage: 0,
        interval: 30 * 60 * 1000,
        images: [],
    }),
    methods: {
        handleToggleDialog(value) {
            this.$emit('input', value);
        },
        handleClickOverlay() {
            this.showControls = true;
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

<style>
.overlay {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 5;
    cursor: none;
}

.sheet {
    overflow: hidden;
}

.preload-image {
    position: absolute;
    height: 0;
    width: 0;
}
</style>
