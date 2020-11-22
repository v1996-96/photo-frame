<template>
    <v-list outlined class="list">
        <v-list-item :to="to">
            <v-list-item-icon>
                <slot name="icon" />
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>
                    <slot />
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: 'CardLink',
    props: {
        to: {
            type: Object,
            required: false,
        },
    },
};
</script>

<style>
.list {
    padding: 0;
}
</style>
