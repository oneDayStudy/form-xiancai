import Vue from 'vue'
import App from './App.vue'

//global
import '@/assets/global/global.css'
// ant-design
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
//导出excel插件
import Blob from './excel/Blob.js'
import Export2Excel from './excel/export2Excel.js'

Vue.config.productionTip = false
// router.onError((error) => {
// const pattern = /Loading chunk (\d)+ failed/g;
// const isChunkLoadFailed = error.message.match(pattern);
// const targetPath = router.history.pending.fullPath;
// if (isChunkLoadFailed) {
// router.replace(targetPath);
// }
// });
new Vue({
  render: h => h(App),
}).$mount('#app')
