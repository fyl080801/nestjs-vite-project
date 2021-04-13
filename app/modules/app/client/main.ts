import App from './App.vue';
import { createApp } from 'vue';

// import { createRouter } from './router';

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
// export const createApp = () => {
//   const app = createSSRApp(App);
//   //   const router = createRouter();
//   //   app.use(router);
//   return { app };
// };

createApp(App).mount('#app');
