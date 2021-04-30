import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

/* Layout */
import Layout from '../layout/index.vue';

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('../views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('../views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true,
        },
      },
    ],
  },
];

export const asyncRoutes: RouteRecordRaw[] = [];

const create = () =>
  createRouter({
    history: createWebHistory('/app'),
    scrollBehavior: () => Promise.resolve({ top: 0 }),
    routes: constantRoutes,
  });

const router = create();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export const resetRouter = () => {
  const newRouter = create();
  const routes = router.getRoutes();
  routes.forEach((r) => router.removeRoute(r.name));
  const newRoutes = newRouter.getRoutes();
  newRoutes.forEach((r) => router.addRoute(r));
  // router.matcher = newRouter.matcher; // reset router
};

export const useRouter = (app: App<Element>) => {
  app.use(router);
};

export default router;
