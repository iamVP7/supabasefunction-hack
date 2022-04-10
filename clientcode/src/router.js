import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/App.vue';
import HomePage from '@/HomePage.vue';
import About from '@/About.vue';
import History from '@/History.vue';

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/history',
        name: 'History',
        component: History,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;