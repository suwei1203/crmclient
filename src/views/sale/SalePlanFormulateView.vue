<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/admin/salechancedeveloplist'}">客户开发计划</el-breadcrumb-item>
			<el-breadcrumb-item>制定开发计划</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button v-show="isExecute()" id="btn" type="primary" size="small" @click="salePlanExecuteView(saleChance.chanceId)">执行开发计划</el-button>
		<el-form :inline="true" :model="saleChance" label-width="130px" style="margin-top: 15px;" disabled>
			<el-form-item label="销售机会编号">
				<el-input v-model="saleChance.chanceId"></el-input>
			</el-form-item>
			<el-form-item label="机会来源">
				<el-input v-model="saleChance.chanceSource"></el-input>
			</el-form-item>
			<el-form-item label="客户名称">
				<el-input v-model="saleChance.chanceCustName"></el-input>
			</el-form-item>
			<el-form-item label="成功概率(%)">
				<el-input v-model="saleChance.chanceRate"></el-input>
			</el-form-item>
			<el-form-item label="概要">
				<el-input v-model="saleChance.chanceTitle"></el-input>
			</el-form-item>
			<el-form-item label="联系人">
				<el-input v-model="saleChance.chanceLinkman"></el-input>
			</el-form-item>
			<el-form-item label="联系人电话">
				<el-input v-model="saleChance.chanceTel"></el-input>
			</el-form-item>
			<el-form-item label="创建人">
				<el-input v-model="userName"></el-input>
			</el-form-item>
			<el-form-item label="创建时间">
				<el-input v-model="saleChance.chanceCreateDate"></el-input>
			</el-form-item>
			<el-form-item label="机会描述">
				<el-input type="textarea" v-model="saleChance.chanceDesc" style="width:400px;"></el-input>
			</el-form-item>
			<el-form-item label="指派给" required>
				<el-input v-model="userName" style="width:400px;"></el-input>
			</el-form-item>
			<el-form-item label="指派日期">
				<el-input v-model="saleChance.chanceDueDate"></el-input>
			</el-form-item>
		</el-form>

		<el-form :model="salePlan" label-width="130px" style="margin-top: 15px;">
			<el-form-item label="已有计划" v-for="(item, index) in salePlan.list" :key="index">
				<!-- @change input内容改变时触发 传入index 唯一性-->
				<el-input v-model="item.planTodo" @change="changeContent(index)"></el-input>
				<el-button v-show="numberarr.indexOf(index)!=-1" style="margin-left:40px;" @click="updateSalePlan(item,index)">保存</el-button>
				<el-button @click="delSalePlan(item)" style="margin-left:40px;">删除</el-button>
			</el-form-item>
			<el-form-item label="新增计划">
				<el-input v-model="newSalePlan.planTodo"></el-input>
				<el-button @click="insertSalePlan()" style="margin-left:40px;">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				saleChance: {
					chanceId: 0,
					chanceSource: '',
					chanceCustName: '',
					chanceTitle: '',
					chanceRate: 0,
					chanceLinkman: '',
					chanceTel: '',
					chanceDesc: '',
					chanceCreateId: 0,
					chanceCreateDate: '',
					chanceDueId: 0,
					chanceDueDate: '',
					chanceStatus: 0
				},
				//用于显示指派人名字
				userName: '',
				//已保存的销售计划
				salePlan: {
					list: []
				},
				//用于动态显示保存按钮
				numberarr: [],
				//存放新建的销售计划
				newSalePlan: {
					planChcId: 0,
					planTodo: '',
					planResult: ''
				},
			};
		},
		created() {
			this.userName = this.$getSessionStorage("sysUser").userName;
			this.newSalePlan.planChcId = this.$getSessionStorage("chanceId");
			// 获取当前销售机会的信息
			this.$axios.post('selectSaleChanceByChanceId', {
					chanceId: this.$getSessionStorage("chanceId")
				})
				.then((response) => {
					this.saleChance = response.data;
				})
				.catch((error) => {
					console.log(error);
				})
			// 销售机会下的所有计划
			this.getSalePlan();
		},

		methods: {
			//封装 获取销售计划的方法
			getSalePlan() {
				this.$axios.post('selectSalePlanByCondition', {
						planChcId: this.$getSessionStorage("chanceId")
					})
					.then((response) => {
						this.salePlan.list = response.data;
					})
					.catch((error) => {
						console.log(error);
					})
			},
			//是否有执行计划权限
			isExecute() {
				return this.saleChance.chanceDueId == this.$getSessionStorage('sysUser').userId;
			},
			//跳转到执行计划组件
			salePlanExecuteView(chanceId) {
				this.$setSessionStorage('chanceId', chanceId);
				this.$router.push('/admin/saleplanexecuteview');
			},
			//已保存的销售机会内容改变时触发 
			changeContent(index) {
				this.numberarr.push(index);
			},
			//将数值num从arr数组中移除
			removenum(arr, num) {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i] == num) {
						arr.splice(i, 1);
					}
				}
			},
			//添加销售计划
			insertSalePlan() {
				this.$axios.post('insertSalePlan', this.newSalePlan)
					.then((response) => {
						if (response.data == 1) {
							alert('添加成功');
							//重新得到销售计划数据
							this.getSalePlan();
							//清空新建销售计划input控件中内容
							this.newSalePlan.planTodo = '';
						} else {
							alert('添加失败');
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			// 修改销售计划
			updateSalePlan(item, index) {
				this.$axios.post('updateSalePlan', item)
					.then((response) => {
						if (response.data == 1) {
							alert('修改成功');
							// 保存按钮消失
							this.removenum(this.numberarr, index);
							//重新得到销售计划数据
							this.getSalePlan();
						} else {
							alert('修改失败');
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			//删除销售计划
			delSalePlan(item) {
				if (!confirm('确认删除？')) {
					return;
				}
				this.$axios.post('delSalePlan', item)
					.then((response) => {
						if (response.data == 1) {
							console.log("删除成功");
							//重新得到销售计划数据
							this.getSalePlan();
						} else {
							alert('删除失败');
						}
					})
					.catch((error) => {
						console.log(error);
					})
			}
		}
	}
</script>

<style scoped>
	.el-input {
		width: 400px;
	}

	#btn {
		margin-top: 30px;
		margin-bottom: 10px;
		margin-left: 40px;
	}
</style>
