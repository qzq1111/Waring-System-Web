import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import StockBulletin from '@/components/StockBulletin'
import KYAnalysis from '@/components/KYAnalysis.vue'
import NBMAnalysis from '@/components/NBMAnalysis.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path:'/stockbulletin',
      name:'StockBulletin',
      component:StockBulletin
    },
    {
      path:'/kyanalysis',
      name:'KYAnalysis',
      component:KYAnalysis
    },
    {
      path:'/nbanalysis',
      name:'NBMAnalysis',
      component:NBMAnalysis,

    },
  ]
})
