<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户开发计划</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :inline="true" :model="params" class="demo-form-inline" size="small">
			<el-form-item label="客户名称">
				<el-input v-model="params.chanceCustName"></el-input>
			</el-form-item>
			<el-form-item label="概要">
				<el-input v-model="params.chanceTitle"></el-input>
			</el-form-item>
			<el-form-item label="联系人">
				<el-input v-model="params.chanceLinkman"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="warning" @click="clearConditions()">清空</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="selectSaleChanceByConditions()">查询</el-button>
			</el-form-item>
			
		</el-form>
		<el-table :data="result.data" stripe style="width: 100%" size="mini" row-style="height:10px" :cell-style="{padding:'2px'}">
			<el-table-column prop="chanceId" label="编号" width="80">
			</el-table-column>
			<el-table-column prop="chanceCustName" label="客户名称" width="250">
			</el-table-column>
			<el-table-column prop="chanceTitle" label="概要" width="300">
			</el-table-column>
			<el-table-column prop="chanceLinkman" label="联系人">
			</el-table-column>
			<el-table-column prop="chanceTel" label="联系电话">
			</el-table-column>
			<el-table-column prop="chanceCreateDate" label="创建时间">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button v-show="isFormulate(scope.row)" class="el-icon-edit-outline" title="制定计划" @click="salePlanFormulateView(scope.row)"
					 type="text" size="medium"></el-button>
					<el-button v-show="isExecute(scope.row)" class="el-icon-d-arrow-right" title="执行计划" @click="salePlanExecuteView(scope.row)"
					 type="text" size="small"></el-button>
					<el-button v-show="isExecute(scope.row)" class="el-icon-check" title="开发成功" @click="developsuc(scope.row)"
					 type="text" size="small"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next,jumper" :total="result.totalRow" :page-size="$store.state.maxPageNum"
		 @current-change="handleCurrentChange">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				result: '',
				params: {
					chanceCustName: '',
					chanceTitle: '',
					chanceLinkman: '',
					chanceStatus: 1,
				},
				clientLinkman:{
					clientLinkmanName:'',
					clientLinkmanSex:0,
					clientLinkmanJob:'',
					clientLinkmanTel:'',
					clientCode:''
				},
				clientInfo:{
					clientCode:'',
					clientName:'',
					clientCustId:0
				}
			}
		},
		created() {
			this.fenye(1);
		},
		methods: {
			fenye(pageNum) {
				//根据登录用户的权限 分页
				if(this.$getSessionStorage("sysUser").userRoleId==1||this.$getSessionStorage("sysUser").userRoleId==4){
					return;
				}
				if(this.$getSessionStorage("sysUser").userRoleId==2){
					
				}
				if(this.$getSessionStorage("sysUser").userRoleId==3){
					this.params.chanceDueId=this.$getSessionStorage("sysUser").userId;
				}
				this.$fenye('selectSaleChanceCount', 'selectSaleChancePaging', this.params, pageNum, this.$store.state.maxPageNum,
					(response) => {
						this.result = response;
					})
			},
			//多条件查询新闻列表  条件为params中的数据
			selectSaleChanceByConditions() {
				this.fenye(1);
			},
			// 清空查询条件
			clearConditions() {
				this.params.chanceCustName = '',
					this.params.chanceTitle = '',
					this.params.chanceLinkman = ''
			},
			//是否有制定开发计划权限
			isFormulate(row) {
				return row.chanceDueId == this.$getSessionStorage('sysUser').userId || this.$getSessionStorage('sysUser').userRoleId ==
					2;
			},
			//是否有执行权限
			isExecute(row) {
				return row.chanceDueId == this.$getSessionStorage('sysUser').userId;
			},
			//跳转制定计划界面
			salePlanFormulateView(saleChance) {			
				this.$setSessionStorage('chanceId', saleChance.chanceId)
				this.$router.push('/admin/saleplanformulateview');
			},
			//跳转执行计划界面
			salePlanExecuteView(saleChance) {
				this.$setSessionStorage("chanceId",saleChance.chanceId);
				this.$router.push('/admin/saleplanexecuteview');
			},
			// 开发成功
			developsuc(saleChance) {
				if (!confirm('确认开发成功？')) {
					return;
				}
				this.$setSessionStorage('chanceId',saleChance.chanceId);
				
				//创建当前客户的客户信息表方法
				this.createClientInfo(saleChance);
				
				//创建当前客户的联系人表的方法
				this.createClientLinkman(saleChance);
				
				//更改销售机会状态为 开发成功
				saleChance.chanceStatus = 2;
				this.$axios.post('updateSaleChance',saleChance)
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
				this.fenye(1);
			},
			// 封装  创建当前客户的客户信息表方法
			createClientInfo(saleChance){
				//赋值参数
				this.clientInfo.clientCode=this.createClientCode(saleChance.chanceId);
				this.clientInfo.clientName = saleChance.chanceCustName;
				this.clientInfo.clientCustId=saleChance.chanceDueId;

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
			createClientLinkman(saleChance){
				//赋值参数
				//联系人名字
				this.clientLinkman.clientLinkmanName=saleChance.chanceLinkman;
				if(saleChance.chanceLinkman==''){
					this.clientLinkman.clientLinkmanName='暂无';
				}
				//联系人性别
				this.clientLinkman.clientLinkmanSex=0;
				//联系人电话
				this.clientLinkman.clientLinkmanTel=saleChance.chanceTel;
				if(saleChance.clientLinkmanTel==''){
					this.clientLinkman.clientLinkmanTel='暂无';
				}
				//联系人职位
				this.clientLinkman.clientLinkmanJob='暂无';
				//客户编号
				this.clientLinkman.clientCode=this.createClientCode(saleChance.chanceId);
			
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
			// 当前页码改变时触发分页 
			handleCurrentChange(val) {
				this.fenye(val);
			},
			// 生成客户编号（KH + 六位日期数字 + 三位数字流水号）
			createClientCode(chanceId) {		
				//3位流水号
				let number;
				if (chanceId < 10) {
					number = '00' + chanceId;
				} else if (chanceId < 100) {
					number = '0' +chanceId;
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
			}
		}
	}
</script>

<style>
	
</style>
