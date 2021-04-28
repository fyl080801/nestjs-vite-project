import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory('/admin'),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('./views/Login.vue'),
    },
    {
      name: 'error',
      path: '/login/error',
      component: () => import('./views/Error.vue'),
    },
  ],
});
