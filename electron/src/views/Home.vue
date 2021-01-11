<template>
    <v-container class="pt-4">
        <page-heading :message="welcomeMsg">
            <party />
        </page-heading>

        <forismatic />
    </v-container>
</template>

<script>
import { getWelcomeMsg } from '@/utils/date';
import PageHeading from '@/components/PageHeading';
import Forismatic from '@/components/Forismatic';
import Party from '@/components/Party';

export default {
    name: 'Home',
    components: { PageHeading, Forismatic, Party },
    computed: {
        welcomeMsg() {
            return getWelcomeMsg();
        },
    },
};
</script>
