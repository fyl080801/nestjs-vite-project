import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

/* Layout */
import Layout from '../layout/index.vue';

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('../views/redirect/index.vue'),
      },
    ],
  },
];

const create = () =>
  createRouter({
    history: createWebHistory('/app'),
    scrollBehavior: () => Promise.resolve({ top: 0 }),
    routes: constantRoutes,
  });

const router = create();

// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export const reset = () => {
//   const newRouter = create();
//   router.matcher = newRouter.matcher; // reset router
// };

export const useRouter = (app: App<Element>) => {
  app.use(router);
};

export default router;
