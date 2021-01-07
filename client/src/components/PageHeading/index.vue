<template>
    <v-row class="mb-8" align="center">
        <v-col class="grow">
            <h2 class="text-h2 heading">{{ message }}</h2>
        </v-col>
        <v-col class="shrink">
            <slot />
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'PageHeading',
    props: {
        message: String,
    },
};
</script>

<style scoped>
.heading {
    text-shadow: 1px 1px 2px black;
}
</style>
