<template>
    <v-slider
        label="Яркость"
        :value="backlightValue"
        :min="200"
        :max="1000"
        :step="10"
        @change="handleChangeBacklight"
    />
</template>

<script>
// import debounce from 'lodash.debounce';
import { helpers as settingsHelpers } from '@/store/modules/settings';

export default {
    name: 'Backlight',
    computed: {
        ...settingsHelpers.mapState(['settings']),
        backlightValue() {
            console.log(this.settings);
            return this.settings?.backlight?.value || 100;
        },
    },
    methods: {
        ...settingsHelpers.mapActions(['updateSettings']),
        handleChangeBacklight(value) {
            this.updateSettings({ backlight: { value } });
        },
    },
};
</script>
