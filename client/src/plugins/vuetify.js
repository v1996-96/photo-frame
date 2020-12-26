import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { Ripple } from 'vuetify/lib/directives';
import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify, {
    directives: {
        Ripple,
    },
});

export default new Vuetify({
    theme: {
        dark: false,
    },
    lang: {
        locales: { ru },
        current: 'ru',
    },
});
