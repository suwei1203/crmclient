<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>销售机会管理</el-breadcrumb-item>
			<el-breadcrumb-item>创建销售机会</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button type="primary" size="small" @click="insertSaleChance()">创建</el-button>
		<el-form :inline="true" :model="saleChance" label-width="130px" style="margin-top: 15px;">
			<el-form-item label="销售机会编号">
				<el-input v-model="saleChance.chanceId" disabled></el-input>
			</el-form-item>
			<el-form-item label="机会来源">
				<el-input v-model="saleChance.chanceSource"></el-input>
			</el-form-item>
			<el-form-item label="客户名称" required>
				<el-input v-model="saleChance.chanceCustName"></el-input>
			</el-form-item>
			<el-form-item label="成功概率(%)" required>
				<el-input v-model="saleChance.chanceRate"></el-input>
			</el-form-item>
			<el-form-item label="概要" required>
				<el-input v-model="saleChance.chanceTitle"></el-input>
			</el-form-item>
			<el-form-item label="联系人">
				<el-input v-model="saleChance.chanceLinkman"></el-input>
			</el-form-item>
			<el-form-item label="联系人电话">
				<el-input v-model="saleChance.chanceTel"></el-input>
			</el-form-item>
			<el-form-item label="创建人">
				<el-input v-model="userName" disabled></el-input>
			</el-form-item>
			<el-form-item label="机会描述">
				<el-input type="textarea" v-model="saleChance.chanceDesc" style="width:400px;"></el-input>
			</el-form-item>
			<el-form-item label="创建时间">
				<el-input v-model="saleChance.chanceCreateDate" disabled></el-input>
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
				userName: ''
			}
		},
		created() {
			this.saleChance.chanceCreateDate = this.$getCurDate();
			// 获取最新的销售机会自增主键
			this.$axios.post('selectLastChanceId')
				.then((response) => {
					this.saleChance.chanceId = response.data;
				})
				.catch((error) => {
					console.log(error);
				})
			this.userName = this.$getSessionStorage("sysUser").userName;
			this.saleChance.chanceCreateId = this.$getSessionStorage("sysUser").userId;
		},
		methods: {
			// 创建销售机会
			insertSaleChance() {
				if (this.saleChance.chanceCustName == '') {
					alert('客户名称不能为空！');
					return;
				} else if (this.saleChance.chanceRate == '') {
					alert('成功概率不能为空!');
					return;
				} else if (isNaN(this.saleChance.chanceRate)) {
					alert('成功概率不能含非数字!');
					return;
				} else if (this.saleChance.chanceRate > 100 || this.saleChance.chanceRate < 0) {
					alert('成功概率必须在0-100之间！');
					return;
				} else if (this.saleChance.chanceTitle == '') {
					alert('概要不能为空！');
					return;
				}
				this.$axios.post('insertSaleChance', this.saleChance)
					.then((response) => {
						if (response.data == 1) {
							this.$router.push('/admin/salechancelist');
						} else {
							alert('添加失败');
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

	.el-button {
		margin-top: 30px;
		margin-left: 40px;
	}
	.el-form{
		margin-top: 10px;
	}
	/*input 输入框和文本域输入的字体不一样   这里让它统一字体*/
	.el-textarea__inner{
	 font-family:"Microsoft";
	 font-size:20px;
	}
	.el-input__inner{
		font-family:"Microsoft";
		font-size:20px;
	}
</style>
