import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import StockBulletin from '@/components/StockBulletin'
import StockCharts from '@/components/StockCharts'
import AssociationRule from '@/components/AssociationRule'

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
      path:'/stockcharts',
      name:'StockCharts',
      component:StockCharts
    },
    {
      path:'/associationrule',
      name:'AssociationRule',
      component:AssociationRule
    },
  ]
})
