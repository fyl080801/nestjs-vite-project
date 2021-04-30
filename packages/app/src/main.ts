import App from './App.vue';
import { createApp } from 'vue';
import { useRouter } from './router';
import { useSvgIcon } from './icons';

import 'normalize.css';

const app = createApp(App);

useRouter(app);
useSvgIcon(app);

app.mount('#app');
