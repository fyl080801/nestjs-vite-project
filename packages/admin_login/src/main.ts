import App from './App.vue';
import { createApp } from 'vue';

// createApp(App).mount('#app');

(async () => {
  const app = createApp(App);
  // Register global components
  // registerGlobComp(app);

  // Configure routing
  // setupRouter(app);

  // Configure vuex store
  // setupStore(app);

  // Register global directive
  // setupGlobDirectives(app);

  // Configure global error handling
  // setupErrorHandle(app);

  // Mount when the route is ready
  // await Promise.all([
  //   // setupI18n(app),
  //   router.isReady(),
  // ]);

  app.mount('#app', true);

  // The development environment takes effect
  // if (isDevMode()) {
  //   // app.config.performance = true;
  //   window.__APP__ = app;
  // }
})();
