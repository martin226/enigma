import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import VueTippy from 'vue-tippy';
import App from './App.vue';
import './registerServiceWorker';
import './assets/css/index.css';

Vue.use(VueClipboard);
Vue.use(VueTippy, {
    directive: 'tippy',
    defaultPosition: 'top',
});

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount('#app');
