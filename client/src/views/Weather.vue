<template>
    <v-container class="pt-4">
        <page-heading message="Погода" />
    </v-container>
</template>

<script>
import PageHeading from '@/components/PageHeading';

export default {
    name: 'Weather',
    components: { PageHeading },
};
</script>
