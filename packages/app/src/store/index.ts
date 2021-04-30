// // import Vue from 'vue';
// import { App } from 'vue';
// import { createStore } from 'vuex';
// // import getters from './getters';

// // // Vue.use(Vuex);

// // const modulesFiles = import.meta.globEager('./modules/*.ts');

// // // you do not need `import app from './modules/app'`
// // // it will auto require all vuex module from modules file
// // const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
// //   // set './app.js' => 'app'
// //   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
// //   const value = modulesFiles[modulePath];
// //   modules[moduleName] = value.default;
// //   return modules;
// // }, {});

// const store = createStore<IRootState>({
//   // modules,
//   // getters,
// });

// export interface IRootState {
//   app: IAppState;
//   user: IUserState;
//   tagsView: ITagsViewState;
//   errorLog: IErrorLogState;
//   permission: IPermissionState;
//   settings: ISettingsState;
// }

// export const useStore = (app: App<Element>) => {
//   app.use(store);
// };

// export default store;

export * from './modules/app';
export * from './modules/errorLog';
export * from './modules/settings';
export * from './modules/tagsView';
export * from './modules/user';
export * from './modules/permission';
