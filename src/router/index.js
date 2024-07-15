import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import HelpView from '@/views/HelpView.vue';
import ComplianceView from '@/views/ComplianceView.vue';
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
        path: '/help',
        name: 'Help',
        component: HelpView,
        meta: {
            title: 'Help | AdGuard '
        }
    },
    {
        path: '/compliance/:id',
        name: 'Compliance',
        component: ComplianceView,
        meta: {
            title: 'Compliance | AdGuard '
        },
        props: true,
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
