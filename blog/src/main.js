import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import api from './api/api'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/util/reset.css'

api.whoAmI().then(res => {
    if (res) {
        console.log("获取用户成功");
        store.dispatch('changeLoginUser', res)
    }
}).catch(err => {
    console.log("未获取到用户")
});

console.log([
    "                   _ooOoo_",
    "                  o8888888o",
    "                  88\" . \"88",
    "                  (| -_- |)",
    "                  O\\  =  /O",
    "               ____/`---'\\____",
    "             .'  \\\\|     |//  `.",
    "            /  \\\\|||  :  |||//  \\",
    "           /  _||||| -:- |||||-  \\",
    "           |   | \\\\\\  -  /// |   |",
    "           | \\_|  ''\\---/''  |   |",
    "           \\  .-\\__  `-`  ___/-. /",
    "         ___`. .'  /--.--\\  `. . __",
    "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
    "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
    "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
    "======`-.____`-.___\\_____/___.-`____.-'======",
    "                   `=---='",
    "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
    "                   永无BUG"
].join('\n'));

Vue.prototype.$api = api

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')