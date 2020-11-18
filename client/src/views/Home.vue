<template>
    <div>
        <button @click="handleClickAuthorize">Authorize</button>
        <button @click="handleClickCheck">Check</button>
    </div>
</template>

<script>
import { api } from '@/api';

export default {
    name: 'Home',
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
