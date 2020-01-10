<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>销售机会管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :inline="true" :model="saleChance" class="demo-form-inline" size="small">
			<el-form-item label="客户名称">
				<el-input v-model="saleChance.chanceCustName"></el-input>
			</el-form-item>
			<el-form-item label="概要">
				<el-input v-model="saleChance.chanceTitle"></el-input>
			</el-form-item>
			<el-form-item label="联系人">
				<el-input v-model="saleChance.chanceLinkman"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="result.data" stripe style="width: 100%">
			<el-table-column prop="chanceId" label="编号" width="180">
			</el-table-column>
			<el-table-column prop="chanceCustName" label="客户名称" width="180">
			</el-table-column>
			<el-table-column prop="chanceTitle" label="概要">
			</el-table-column>
			<el-table-column prop="chanceLinkman" label="联系人">
			</el-table-column>
			<el-table-column prop="chanceTel" label="联系电话">
			</el-table-column>
			<el-table-column prop="chanceCreateDate" label="创建时间">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button class="el-icon-edit" type="text" size="medium"></el-button>
					<el-button class="el-icon-delete" @click="handleClick(scope.row)" type="text" size="small"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" :total="1000">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				saleChance: {
					chanceId: 1,
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
				},
				result:'',
				params: {
					beginNum: 0,
					maxPageNum: 8

				}


			}
		},
		created() {
			this.fenye(1);
		},
		methods: {
			fenye(pageNum) {
				this.$fenye('selectSaleChanceCount', 'selectSaleChancePaging', null, pageNum, this.$store.state.maxPageNum,
					(response) => {
						console.log(response);
						this.result=response;
					})
			},
			handleClick(){
				
			}
		}


	}
</script>

<style>
</style>
