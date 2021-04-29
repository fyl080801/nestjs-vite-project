// import Vue from 'vue';
import { App } from 'vue';
import { createStore } from 'vuex';
import getters from './getters';

// Vue.use(Vuex);

const modulesFiles = import.meta.globEager('./modules/*.ts');

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles[modulePath];
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = createStore({
  modules,
  getters,
});

export const useStore = (app: App<Element>) => {
  app.use(store);
};

export default store;
