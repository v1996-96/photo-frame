<template>
    <v-container class="pt-4">
        <h2 class="text-h2 mb-10">{{ welcomeMsg }}</h2>

        <v-row>
            <v-col cols="4">
                <card-link to="/settings">
                    <template #icon>
                        <v-icon size="40">mdi-image-multiple</v-icon>
                    </template>
                    <span class="text-body-1">Галерея</span>
                </card-link>
            </v-col>

            <v-col cols="4">
                <card-link to="/settings">
                    <template #icon>
                        <v-icon size="40">mdi-newspaper</v-icon>
                    </template>
                    <span class="text-body-1">Новости</span>
                </card-link>
            </v-col>

            <v-col cols="4">
                <card-link to="/settings">
                    <template #icon>
                        <v-icon size="40">mdi-white-balance-sunny</v-icon>
                    </template>
                    <span class="text-body-1">Погода</span>
                </card-link>
            </v-col>

            <v-col cols="4">
                <card-link to="/settings">
                    <template #icon>
                        <v-icon size="40">mdi-playlist-check</v-icon>
                    </template>
                    <span class="text-body-1">Напоминалки</span>
                </card-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getWelcomeMsg } from '@/utils/date';
import CardLink from '@/components/card-link';

export default {
    name: 'Home',
    components: { CardLink },
    computed: {
        welcomeMsg() {
            return getWelcomeMsg();
        },
    },
    methods: {
        handleClick() {},
    },
};
</script>
