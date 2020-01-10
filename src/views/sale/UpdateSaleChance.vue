<template>
	<div>
		<el-form  :model="saleChance" label-width="80px">
			<el-form-item label="销售机会编号">
				<el-input v-model="saleChance.chanceId" disabled></el-input>
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
				<el-input v-model="saleChance.chanceCreateId" disabled></el-input>
			</el-form-item>
			<el-form-item label="创建时间">
				<el-input v-model="saleChance.chanceCreateDate" disabled></el-input>
			</el-form-item>
			<el-form-item label="机会描述">
				<el-input type="textarea" v-model="saleChance.chanceDesc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="updateSaleChance()">更新</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				saleChance: {
					chanceId: 5,
					chanceSource: '',
					chanceCustName: '',
					chanceTitle: '',
					chanceRate: 0,
					chanceLinkman: '',
					chanceTel:'',
					chanceDesc: '',
					chanceCreateId: 0,
					chanceCreateDate: '',
					//以下字段先不用
					chanceDueId: 0,
					chanceDueDate: '',
					chanceStatus: 0
				}
			}
		},
		created() {
			this.$axios.post('selectSaleChanceCountByChanceId', {
					chanceId: 10
				})
				.then((response) => {
					console.log(response);
					this.saleChance = response.data;
				})
				.catch((error) => {
					console.log(error);
				})
		},
		methods: {
			updateSaleChance() {
				this.$axios.post('updateSaleChance', this.saleChance)
					.then((response) => {
						if (response.data == 1) {
							console.log("成功");
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

<style>
</style>
