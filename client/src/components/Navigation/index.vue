<template>
    <v-navigation-drawer app mini-variant permanent>
        <v-list>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Главная</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-newspaper</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Новости</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-image-multiple</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Фото</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-white-balance-sunny</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Погода</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-playlist-check</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Напоминалки</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <template v-slot:append>
            <v-list>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-cog</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Настройки</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'Navigation',
};
</script>
