import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Settings from '@/views/Settings.vue';
import Gallery from '@/views/Gallery.vue';
import News from '@/views/News.vue';
import Weather from '@/views/Weather.vue';
import Todos from '@/views/Todos.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/gallery',
        name: 'Gallery',
        component: Gallery,
    },
    {
        path: '/news',
        name: 'News',
        component: News,
    },
    {
        path: '/weather',
        name: 'Weather',
        component: Weather,
    },
    {
        path: '/todos',
        name: 'Todos',
        component: Todos,
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
