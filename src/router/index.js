import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import InsertSaleChance from '../views/sale/InsertSaleChance.vue'
import UpdateSaleChance from '../views/sale/UpdateSaleChance.vue'
import SaleChanceList from '../views/sale/SaleChanceList.vue'
import AppointSaleChance from '../views/sale/AppointSaleChance.vue'

import SaleChanceDevelopList from '../views/sale/SaleChanceDevelopList.vue'
import SalePlanFormulateView from '../views/sale/SalePlanFormulateView.vue'
import SalePlanExecuteView from '../views/sale/SalePlanExecuteView.vue'


Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Login
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/admin',
		name: 'Admin',
		component: Admin,
		children: [{
				path: '/admin/',
				name: 'HelloWorld',
				component: HelloWorld
			}, {
				//添加销售机会组件
				path: '/admin/insertsalechance',
				name: 'InsertSaleChance',
				component: InsertSaleChance
			}, {
				//修改销售机会组件
				path: '/admin/updatesalechance',
				name: 'UpdateSaleChance',
				component: UpdateSaleChance
			},
			{
				//销售机会列表组件
				path: '/admin/salechancelist',
				name: 'SaleChanceList',
				component: SaleChanceList
			},
			{
				//指派销售机会组件
				path: '/admin/appointsalechance',
				name: 'AppointSaleChance',
				component: AppointSaleChance
			}, {
				//销售机会开发列表组件
				path: '/admin/salechancedeveloplist',
				name: 'SaleChanceDevelopList',
				component: SaleChanceDevelopList
			},
			{
				//销售机会制定组件
				path: '/admin/saleplanformulateview',
				name: 'SalePlanFormulateView',
				component: SalePlanFormulateView
			},
			{
				//销售机会执行组件
				path: '/admin/saleplanexecuteview',
				name: 'SalePlanExecuteView',
				component: SalePlanExecuteView
			}

		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
