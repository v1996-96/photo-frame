<template>
    <v-row class="mb-8" align="center">
        <v-col class="grow">
            <h2 class="text-h2 font-weight-bold heading">{{ message }}</h2>
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
    display: inline-block;
    color: #fcedd8;
    font-family: 'Niconne', cursive;
    text-shadow: 5px 5px 0px #eb452b;
}
</style>
