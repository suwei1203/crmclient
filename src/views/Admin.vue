<template>
	<div>
		<el-container>
			<el-header>xx公司客户关系管理系统
				<el-badge class="item">欢迎你 :{{$getSessionStorage('sysUser').userName}} |
				<el-button @click="signOut()" type="text">安全退出</el-button>
				</el-badge>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<!-- router属性   激活导航时以 index 作为 path 进行路由跳转-->
					<el-menu id="menu" router class="el-menu-vertical-demo" background-color="#D3DCE6" active-text-color="#777">
						<el-submenu index="1">
							<!-- 分组标签 -->
							<template slot="title">
								<span>营销管理</span>
							</template>
							<el-menu-item ><el-button  @click="jumpSaleChanceList()" type="text" size="medium">销售机会管理</el-button></el-menu-item>
							<el-menu-item ><el-button  @click="jumpSaleChanceDevelopList()" type="text" size="medium">客户开发计划</el-button></el-menu-item>
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
		data() {
			return {
				bodyHeight: 0,
			}
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
			signOut(){
				this.$removeSessionStorage('sysUser');
				this.$removeSessionStorage('chanceId');
				this.$router.push('/login');
			},
			jumpSaleChanceList(){
				if(this.$getSessionStorage('sysUser').userRoleId==2||this.$getSessionStorage('sysUser').userRoleId==3){
					this.$router.push('/admin/salechancelist');
				}else{
					alert('您权限不足,不能访问');
				}
				
			},
			jumpSaleChanceDevelopList(){
				if(this.$getSessionStorage('sysUser').userRoleId==2||this.$getSessionStorage('sysUser').userRoleId==3){
					this.$router.push('/admin/salechancedeveloplist');
				}else{
					alert('您权限不足,不能访问');
				}
			}
		}
	}
</script>

<style >
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
	.el-menu-item{
		padding-left: -40px;
	}
</style>
