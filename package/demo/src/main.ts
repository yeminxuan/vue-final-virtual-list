import { createApp } from 'vue';
import App from './App.vue';
import '@/style/reset.less';
import router from "./router";
import finalVirtualList from '../../final-vue-virtual-list/src/index.ts';
console.log(finalVirtualList);

createApp(App).use(router).use(finalVirtualList).mount('#app');
