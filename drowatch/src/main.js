import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import ECharts from 'vue-echarts'
import { rtdbPlugin } from 'vuefire'

import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import "echarts-liquidfill"

Vue.config.productionTip = false

Vue.use(rtdbPlugin, {
  serialize(snapshot) {
    // eslint-disable-next-line
    return snapshot.val()
  }
})

Vue.component('v-chart', ECharts)

new Vue({
  render: h => h(App),
}).$mount('#app')
