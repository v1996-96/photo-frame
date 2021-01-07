<template>
    <v-container class="pt-4">
        <page-heading message="Галерея" />

        <div class="mb-10">
            <v-btn color="accent" x-large class="mr-4" @click="showCarousel = !showCarousel">
                Показать фоточки
            </v-btn>
            <v-btn color="info" x-large class="mr-4" @click="showSettings = !showSettings">
                {{ showSettings ? 'Закрыть настройки' : 'Настроить' }}
            </v-btn>
            <v-btn x-large @click="loadPreviews">Сбросить кэш</v-btn>
        </div>

        <gallery-carousel v-model="showCarousel" />
        <images-list v-if="!showSettings && !showCarousel" />
        <gallery-settings v-if="showSettings" />
    </v-container>
</template>

<script>
import { api } from '@/api';
import { helpers as authHelpers } from '@/store/modules/auth';
import GallerySettings from '@/components/GallerySettings';
import GalleryCarousel from '@/components/GalleryCarousel';
import ImagesList from '@/components/ImagesList';
import PageHeading from '@/components/PageHeading';

export default {
    name: 'Gallery',
    components: { GallerySettings, GalleryCarousel, ImagesList, PageHeading },
    data: () => ({
        showSettings: false,
        showCarousel: false,
    }),
    computed: {
        ...authHelpers.mapGetters(['isAuthorized']),
    },
    methods: {
        loadPreviews() {
            api.gallery.loadPreviews();
        },
    },
};
</script>
