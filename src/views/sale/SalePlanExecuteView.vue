<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户开发计划</el-breadcrumb-item>
			<el-breadcrumb-item>执行开发计划</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button id="btn" type="primary" size="small" @click="developsuc(saleChance)">开发成功</el-button>
		<el-button id="btn" type="primary" size="small" @click="salePlanFormulateView()">制定开发计划</el-button>
		<el-button id="btn" type="primary" size="small" @click="developfail(saleChance)">终止开发</el-button>

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
				clientLinkman: {
					clientLinkmanName: '',
					clientLinkmanSex: 0,
					clientLinkmanJob: '',
					clientLinkmanTel: '',
					clientCode: ''
				},
				clientInfo: {
					clientCode: '',
					clientName: '',
					clientCustId: 0
				}
			};
		},
		created() {

			this.userName = this.$getSessionStorage("sysUser").userName;
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

		methods: {

			// 开发成功
			developsuc(saleChance) {
				if (!confirm('确认开发成功？')) {
					return;
				}
				this.$setSessionStorage('chanceId', saleChance.chanceId);

				//创建当前客户的客户信息表方法
				this.createClientInfo(saleChance);

				//创建当前客户的联系人表的方法
				this.createClientLinkman(saleChance);

				//更改销售机会状态为 开发成功
				saleChance.chanceStatus = 2;
				this.$axios.post('updateSaleChance', saleChance)
					.then((response) => {
						if (response.data == 1) {
							console.log("销售机会表成功")
						} else {
							alert('发生错误');
						}
					})
					.catch((error) => {
						console.log(error);
					})
				this.$router.push('/admin/salechancedeveloplist');
			},
			// 封装  创建当前客户的客户信息表方法
			createClientInfo(saleChance) {
				//赋值参数
				this.clientInfo.clientCode = this.createClientCode(saleChance.chanceId);
				this.clientInfo.clientName = saleChance.chanceCustName;
				this.clientInfo.clientCustId = saleChance.chanceDueId;

				this.$axios.post('insertClientInfo', this.clientInfo)
					.then((response) => {
						if (response.data == 1) {
							console.log("客户信息表成功")
						} else {
							alert('发生错误');
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			// 封装  创建当前客户的联系人表的方法
			createClientLinkman(saleChance) {
				//赋值参数
				//联系人名字
				this.clientLinkman.clientLinkmanName = saleChance.chanceLinkman;
				if (saleChance.chanceLinkman == '') {
					this.clientLinkman.clientLinkmanName = '暂无';
				}
				//联系人性别
				this.clientLinkman.clientLinkmanSex = 0;
				//联系人电话
				this.clientLinkman.clientLinkmanTel = saleChance.chanceTel;
				if (saleChance.clientLinkmanTel == '') {
					this.clientLinkman.clientLinkmanTel = '暂无';
				}
				//联系人职位
				this.clientLinkman.clientLinkmanJob = '暂无';
				//客户编号
				this.clientLinkman.clientCode = this.createClientCode(saleChance.chanceId);

				this.$axios.post('insertClientLinkman', this.clientLinkman)
					.then((response) => {
						if (response.data == 1) {
							console.log("联系人表成功");
						} else {
							alert('发生错误');
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			// 生成客户编号（KH + 六位日期数字 + 三位数字流水号）
			createClientCode(chanceId) {
				//3位流水号
				let number;
				if (chanceId < 10) {
					number = '00' + chanceId;
				} else if (chanceId < 100) {
					number = '0' + chanceId;
				} else if (chanceId < 1000) {
					number = chanceId;
				} else {
					number = chanceId.toString().slice(0, 3);
				}
				//六位日期数字
				let time = this.$getCurDate();
				let year = time.slice(0, 4);
				let month = time.slice(5, 7);
				return 'KH' + year + month + number;
			},
			//开发失败
			developfail(saleChance) {
				if (!confirm('确认开发失败？')) {
					return;
				}
				//更改销售机会状态为 开发失败
				this.saleChance.chanceStatus = 3;
				this.$axios.post('updateSaleChance', saleChance)
					.then((response) => {
						if (response.data == 1) {
							this.$router.push('/admin/salechancedeveloplist');
						} else {
							alert('发生错误');
						}
					})
					.catch((error) => {
						console.log(error);
					})

			},
			//跳转到制定计划组件
			salePlanFormulateView() {
				this.$router.push('/admin/saleplanformulateview');
			},

			//执行效果内容改变时触发 显示出一个保存按钮 
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
				this.numberarr = arr;
			},
			//修改销售计划执行结果
			updateSalePlan(item, index) {
				if (item.planResult == null || item.planResult == '') {
					alert('执行效果不能更改为空');
					return;
				}
				this.$axios.post('updateSalePlan', item)
					.then((response) => {
						if (response.data == 1) {
							//console.log(this.numberarr);
							alert('保存成功');
							this.removenum(this.numberarr, index);
							//重新得到数据
							this.$axios.post('selectSalePlanByCondition', {
									planId: item.planId
								})
								.then((response) => {
									console.log(response);
									//此方法可以避免再次修改input中内容时 input输入框无法操作的问题
									this.$set(this.salePlan.list, index, response.data[0]);
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
