import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ScanView from '@/views/ScanView.vue';
import HelpView from '@/views/HelpView.vue';
import setTitle from '@/utils/setTitle';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: {
            title: 'Home | AdGuard'
        }
    },
    {
        path: '/scan',
        name: 'Scan',
        component: ScanView,
        meta: {
            title: 'Scan | AdGuard'
        }
    },
    {
        path: '/help',
        name: 'Help',
        component: HelpView,
        meta: {
            title: 'Help | AdGuard '
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
