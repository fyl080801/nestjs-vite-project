import App from './App.vue';
import { createApp } from 'vue';
import { useRouter } from './router';
import { useStore } from './store';

const app = createApp(App);

useStore(app);
useRouter(app);

app.mount('#app');
