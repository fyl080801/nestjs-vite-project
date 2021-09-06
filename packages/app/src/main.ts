import App from './App.vue';
import { createApp } from 'vue';
import { useRouter } from './router';
import { useSvgIcon } from './icons';

import 'normalize.css';
import './styles/index.scss';

if (import.meta.env.DEV) {
  import('element-plus/theme-chalk/index.css');
}

const app = createApp(App);

useRouter(app);
useSvgIcon(app);

app.mount('#app');
