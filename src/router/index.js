import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import InsertSaleChance from '../views/sale/InsertSaleChance.vue'
import UpdateSaleChance from '../views/sale/UpdateSaleChance.vue'
import SaleChanceList from '../views/sale/SaleChanceList.vue'
import AppointSaleChance from '../views/sale/AppointSaleChance.vue'
import SaleChanceExecuteList from '../views/sale/SaleChanceExecuteList.vue'
import SalePlanFormulateView from '../views/sale/AppointSaleChance.vue'


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
				path: '/admin/insertsalechance',
				name: 'InsertSaleChance',
				component: InsertSaleChance
			}, {
				path: '/admin/updatesalechance',
				name: 'UpdateSaleChance',
				component: UpdateSaleChance
			},
			{
				path: '/admin/salechancelist',
				name: 'SaleChanceList',
				component: SaleChanceList
			},
			{
				path: '/admin/appointsalechance',
				name: 'AppointSaleChance',
				component: AppointSaleChance
			},{
				path: '/admin/salechanceexecutelist',
				name: 'SaleChanceExecuteList',
				component: SaleChanceExecuteList
			},
			{
				path: '/admin/saleplanformulateview',
				name: 'SalePlanFormulateView',
				component: SalePlanFormulateView
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
