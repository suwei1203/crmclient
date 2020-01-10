import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import AddSaleChance from '../views/sale/AddSaleChance.vue'
import UpdateSaleChance from '../views/sale/UpdateSaleChance.vue'

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
			path: '/admin/addsalechance',
			name: 'AddSaleChance',
			component: AddSaleChance
		}, {
			path: '/admin/updatesalechance',
			name: 'UpdateSaleChance',
			component: UpdateSaleChance
		}]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
