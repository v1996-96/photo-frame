<template>
    <v-container class="pt-4">
        <h2 class="text-h2 mb-2">Аккаунты</h2>

        <p class="text-subtitle-1 mb-6">
            Вы можете войти сразу в несколько аккаунтов для доступа к функционалу
        </p>

        <v-list v-if="isAuthorized || !authorization.userCode" outlined class="mb-4">
            <v-list-item v-for="account in accounts" :key="account.id">
                <v-list-item-avatar>
                    <v-avatar color="primary" size="56">
                        <img :src="account.avatarUrl" />
                    </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{ account.realName }}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn depressed @click="logout(account)">Выйти</v-btn>
                </v-list-item-action>
            </v-list-item>

            <v-list-item v-if="!authorization.userCode" @click="handleClickGetCode">
                <v-list-item-avatar>
                    <v-avatar size="56">
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

        <v-card v-if="authorization.userCode" shaped>
            <v-card-title>
                Авторизуйтесь, перейдя по ссылке
                <v-spacer />
                <a class="text-body-1 text-decoration-none">{{ authorization.verificationUrl }}</a>
            </v-card-title>
            <v-card-text>
                <h3 class="text-h3">{{ authorization.userCode }}</h3>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="primary" @click="handleClickGetCode">Обновить код</v-btn>
                <v-btn text @click="clearCode">Отменить</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { LongPolling } from '@/utils/long-polling';
import { helpers as authHelpers } from '@/store/modules/auth';

export default {
    name: 'Auth',
    data: () => ({
        pollingInstance: null,
    }),
    computed: {
        ...authHelpers.mapState(['authorization', 'accounts']),
        ...authHelpers.mapGetters(['isAuthorized']),
    },
    methods: {
        ...authHelpers.mapMutations(['clearCode']),
        ...authHelpers.mapActions(['getCode', 'checkAuth', 'logout']),
        async handleClickGetCode() {
            await this.getCode();
            this.startPolling();
        },
        checkAuthWraper() {
            const { expiresAt, userCode } = this.authorization;

            if (!userCode || new Date().getTime() > expiresAt) {
                this.pollingInstance.stop();
            } else {
                this.checkAuth();
            }
        },
        startPolling() {
            const { interval, expiresAt } = this.authorization;
            const timeout = interval * 1000;

            if (!expiresAt) {
                return;
            }

            if (!this.pollingInstance) {
                this.pollingInstance = new LongPolling(this.checkAuthWraper, timeout, {
                    ignoreFailures: true,
                });
            }

            this.pollingInstance.stop();
            this.pollingInstance.setTimeout(timeout);
            this.pollingInstance.start();
        },
    },
    beforeDestroy() {
        if (this.pollingInstance) {
            this.pollingInstance.stop();
        }
    },
};
</script>
