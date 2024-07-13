import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ScanPage from '@/views/ScanPage.vue';
import setTitle from '@/utils/setTitle';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        meta: {
            title: 'AdGuard Home'
        }
    },
    {
        path: '/scan',
        name: 'Scan',
        component: ScanPage,
        meta: {
            title: 'AdGuard Scan'
        }
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    setTitle(to.meta.title);
    next();
});

export default router;
