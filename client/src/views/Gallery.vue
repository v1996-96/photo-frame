<template>
    <v-container class="pt-4">
        <h2 class="text-h2 mb-10">Галерея</h2>
    </v-container>
</template>

<script>
import { api } from '@/api';

export default {
    name: 'Gallery',
    created() {
        api.gallery.structure();
    },
};
</script>
