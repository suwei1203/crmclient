<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户开发计划</el-breadcrumb-item>
			<el-breadcrumb-item>执行开发计划</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button id="btn" type="primary" size="small" @click="developsuccess()">开发成功</el-button>
		<el-button id="btn" type="primary" size="small" @click="salePlanFormulateView()">制定开发计划</el-button>
		<el-button id="btn" type="primary" size="small" @click="">终止开发</el-button>

		<el-form :inline="true" :model="saleChance" label-width="130px" style="margin-top: 15px;">
			<el-form-item label="销售机会编号">
				<el-input v-model="saleChance.chanceId" disabled></el-input>
			</el-form-item>
			<el-form-item label="机会来源">
				<el-input v-model="saleChance.chanceSource" disabled></el-input>
			</el-form-item>
			<el-form-item label="客户名称">
				<el-input v-model="saleChance.chanceCustName" disabled></el-input>
			</el-form-item>
			<el-form-item label="成功概率(%)">
				<el-input v-model="saleChance.chanceRate" disabled></el-input>
			</el-form-item>
			<el-form-item label="概要">
				<el-input v-model="saleChance.chanceTitle" disabled></el-input>
			</el-form-item>
			<el-form-item label="联系人">
				<el-input v-model="saleChance.chanceLinkman" disabled></el-input>
			</el-form-item>
			<el-form-item label="联系人电话">
				<el-input v-model="saleChance.chanceTel" disabled></el-input>
			</el-form-item>
			<el-form-item label="创建人">
				<el-input v-model="userName" disabled></el-input>
			</el-form-item>
			<el-form-item label="创建时间">
				<el-input v-model="saleChance.chanceCreateDate" disabled></el-input>
			</el-form-item>
			<el-form-item label="机会描述">
				<el-input type="textarea" v-model="saleChance.chanceDesc" style="width:400px;" disabled></el-input>
			</el-form-item>
			<el-form-item label="指派给" required>
				<el-input v-model="userName" style="width:400px;" disabled></el-input>
			</el-form-item>
			<el-form-item label="指派日期">
				<el-input v-model="saleChance.chanceDueDate" disabled></el-input>
			</el-form-item>
		</el-form>

		<el-form :model="salePlan" label-width="90px" style="margin-top: 15px; width:2000px;">
			<el-form-item label="已有计划" v-for="(item, index) in salePlan.list" :key="index">
				<el-input v-model="item.planTodo" disabled style="margin-right: 20px;"></el-input>
				执行效果
				<el-input v-model="item.planResult" @change="changeContent(index)" style="margin-left: 20px;"></el-input>
				<el-button v-show="numberarr.indexOf(index)!=-1" style="margin-left:40px;" @click="updateSalePlan(item,index)">保存</el-button>
			</el-form-item>
		</el-form>
		<el-button style="margin-left:40px;" @click="test()">测试</el-button>
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
				//用于更改已存在的销售机会内容时  动态显示保存按钮
				numberarr: [],

				savedSalePlan: {
					planChcId: 0,
					planTodo: '',
					planResult: ''
				},
				//此数据用于刷新组件
				update: true,
				clientInfo:{
					clientCode:'',
					clientName:'',
					clientCustId:0
					
				}
			};
		},
		created() {
			
			this.userName = this.$getSessionStorage("sysUser").userName;
			//此条代码赋值作用？
			this.savedSalePlan.planChcId = this.$getSessionStorage("chanceId");
			this.$axios.post('selectSaleChanceByChanceId', {
					chanceId: this.$getSessionStorage("chanceId")
				})
				.then((response) => {
					this.saleChance = response.data;
				})
				.catch((error) => {
					console.log(error);
				})
			// 销售机会下的所有已存在的计划 
			this.$axios.post('selectSalePlanByPlanChcId', {
					planChcId: this.$getSessionStorage("chanceId")
				})
				.then((response) => {
					this.salePlan.list = response.data;
				})
				.catch((error) => {
					console.log(error);
				})

		},

		methods: {
			test(){
				//生成3位流水号
				let number;
				if(this.saleChance.chanceId<10){
					number='00'+this.saleChance.chanceId;
				}else if(this.saleChance.chanceId<100){
					number='0'+this.saleChance.chanceId;
				}else if(this.saleChance.chanceId<1000){
					number=this.saleChance.chanceId;
				}else{
					number=this.saleChance.chanceId.toString().slice(0,3);
				}
				let time=this.$getCurDate();
				let year=time.slice(0,4);
				let month=time.slice(5,7);
				let day=time.slice(8,10);
				this.clientInfo.clientCode='KH'+year+month+day+number;
				console.log(this.clientInfo.clientCode);
				console.log(this.clientInfo.clientCode.length);
			},
			developsuccess(){
				if (!confirm('确认开发成功？')) {
					return;
				}
				this.saleChance.chanceStatus = 2;
				this.$axios.post('updateSaleChance', this.saleChance)
					.then((response) => {
						if (response.data == 1) {
							this.$router.push('/admin/salechanceexecutelist');
						} else {
							alert('发生错误');
						}
					})
					.catch((error) => {
						console.log(error);
					})
					
			},
		
			salePlanFormulateView(){
				this.$router.push('/admin/saleplanformulateview');
			}
			//开发失败位置留用
			,
			reload() {
				// 移除组件
				this.update = false
				// 在组件移除后，重新渲染组件
				// this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
				this.$nextTick(() => {
					this.update = true
				})
			},
			//执行效果内容改变时触发 
			changeContent(index) {
				this.numberarr.push(index);
			},
			//移除数组中指定数值的元素 用于动态显示保存按钮
			removenum(arr, num) {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i] == num) {
						arr.splice(i, 1);
					}
				}
			},
			salePlanFormulateView(){
				this.$router.push('/admin/saleplanformulateview');
			}
			,
			updateSalePlan(item, index) {
				if(item.planResult==null){
					alert(执行效果不能更改为空);
					return;
				}
				this.$axios.post('updateSalePlan', item)
					.then((response) => {
						if (response.data == 1) {
							console.log(this.numberarr);
							alert('修改成功');
							this.removenum(this.numberarr, index);
							//重新得到数据
							this.$axios.post('selectSalePlanByPlanChcId', {
									planChcId: this.$getSessionStorage("chanceId")
								})
								.then((response) => {
									this.salePlan.list = response.data;
								})
								.catch((error) => {
									console.log(error);
								})
						} else {
							alert('修改失败');
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},

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
