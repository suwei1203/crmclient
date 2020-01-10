<template>
	<div>
		<el-form ref="saleChance" :model="saleChance" label-width="80px">
			<el-form-item label="销售机会编号">
				<el-input v-model="saleChance.chanceId" disabled ></el-input>
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
				<el-input v-model="saleChance.chanceCreateId"></el-input>
			</el-form-item>
			<el-form-item label="创建时间">
				<el-input v-model="saleChance.chanceCreateDate" disable></el-input>
			</el-form-item>
			<el-form-item label="机会描述">
				<el-input type="textarea" v-model="saleChance.chanceDesc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addSaleChance()">保存</el-button>
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
					chanceSource: '哪来的',
					chanceCustName: '什么名',
					chanceTitle: '标题',
					chanceRate: 0,
					chanceLinkman: '联系谁',
					chanceTel: 15840010982,
					chanceDesc: '描述机会',
					chanceCreateId: 10,
					chanceCreateDate: '',
					//以下字段先不用
					chanceDueId: 0,
					chanceDueDate: '',
					chanceStatus: 0
				}
			}
		},
		created(){
			this.chanceCreateDate=this.$getCurDate();
		},
		methods: {
			addSaleChance() {
				console.log(this.saleChance);
				this.$axios.post('insertSaleChance', this.saleChance)
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
