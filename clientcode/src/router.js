import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/App.vue';
import HomePage from '@/HomePage.vue';
import About from '@/About.vue';
import History from '@/History.vue';
import ReadOnlyGrid from '@/components/ReadOnlyGrid.vue';

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
    },
    {
        path: '/h/:historydate',
        name: 'HistoryPage',
        component: ReadOnlyGrid,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;