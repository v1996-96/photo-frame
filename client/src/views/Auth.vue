<template>
    <v-container class="pt-4">
        <h2 class="text-h2 mb-2">Авторизация</h2>

        <p class="text-subtitle-1">
            Добавьте 1 или несколько аккаунтов для доступа к функционалу
        </p>

        <v-list class="mb-4">
            <v-list-item>
                <v-list-item-avatar>
                    <v-avatar color="primary" size="56">
                        VT
                    </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>Виктор Трушин</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn depressed>Выйти</v-btn>
                </v-list-item-action>
            </v-list-item>

            <v-list-item @click="handleClickAuthorize">
                <v-list-item-avatar>
                    <v-avatar color="grey lighten-2" size="56">
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>Добавить аккаунт</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-card shaped>
            <v-card-title>
                Авторизуйтесь, перейдя по ссылке
                <v-spacer />
                <a class="text-body-1 text-decoration-none">https://ya.ru/device</a>
            </v-card-title>
            <v-card-text>
                <h3 class="text-h3">62ujdjmh</h3>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="primary">Обновить код</v-btn>
            </v-card-actions>
        </v-card>

        <!-- <v-btn class="mr-4" color="primary" @click="handleClickAuthorize">Authorize</v-btn> -->
        <!-- <v-btn class="mr-4" color="primary" @click="handleClickCheck">Check</v-btn> -->
    </v-container>
</template>

<script>
import { api } from '@/api';

export default {
    name: 'Auth',
    methods: {
        async handleClickAuthorize() {
            const result = await api.auth();

            console.log(result);
        },
        async handleClickCheck() {
            const result = await api.authCheck();

            console.log(result);
        },
    },
};
</script>
