<template>
	<div>
		<el-container>
			<el-header>xx公司客户关系管理系统
				<el-badge class="item">欢迎你 :{{sysUser.userName}} |
				<el-link :underline="false" style=" color:#000000;">退出</el-link>
				</el-badge>

			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu router default-active="2" class="el-menu-vertical-demo" background-color="#D3DCE6" text-color="#333"
					 active-text-color="#777">
						<el-submenu index="1">
							<template slot="title">
								<span>营销管理</span>
							</template>
							<el-menu-item index="/admin/salechancelist">销售机会管理</el-menu-item>
							<el-menu-item index="/admin/salechanceexecutelist">客户开发计划</el-menu-item>
						</el-submenu>
						<el-submenu index="2">
							<template slot="title">
								<span>客户管理</span>
							</template>
							<el-menu-item index="2-1">客户信息管理</el-menu-item>
							<el-menu-item index="2-2">客户流失管理</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main id="main">
					<router-view></router-view>
				</el-main>
			</el-container>
			<el-footer>&copy; 东软睿道版权所有 www.neusoft.com</el-footer>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'Admin',
		data() {
			return {
				bodyHeight: 0,
				sysUser: ''
			}
		},
		created() {
			this.sysUser = this.$getSessionStorage('sysUser');
		},
		mounted() {
			document.getElementById('main').style.height = document.body.clientHeight - 120 + 'px';
			this.bodyHeight = document.body.clientHeight;
			//监听浏览器窗口尺寸改变事件
			window.onresize = () => {
				//获取body高度，赋值给this.bodyHeight
				this.bodyHeight = document.body.clientHeight;
			}
		},
		watch: {
			bodyHeight: function() {
				document.getElementById('main').style.height = this.bodyHeight - 120 + 'px';
			}
		},
		methods: {

		}
	}
</script>

<style>
	html,
	body {
		margin: 0;
		padding: 0;
		width: 100%;
		/*body高度一定要设置成100%，否则body的高度始终由内容撑开。*/
		height: 100%;
	}

	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-header {
		font-size: 24px;
	}

	.el-footer {
		font-size: 14px;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
	}

	.item {
		font-size: 16px;
		float: right;
		margin-top: 10px;
		margin-right: 50px;
	}
	.el-link{
		font-size: 16px;
	}
</style>
