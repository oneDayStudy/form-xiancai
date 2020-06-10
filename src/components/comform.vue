<template>
  <div class="comform">
    <a-row :gutter="20" type="flex" justify="start">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-bottom:20px;">
        <a-card title="" hoverable
        :headStyle="cardHeaderStyle"
        style="width:100%;text-align:center;">
		 <!-- <span style="margin-right:20px"> {{user}}</span> -->
        <a-range-picker @change="onChange" :locale="locale"
		:default-value="defaultDateValue"
		/>
        <a-button type="primary" style="margin-bottom:10px;" @click="fnAjaxDate">
          <a-icon type="search"></a-icon>
             确定
        </a-button>
		<span v-if="this.tables.length>0" style="font-size: 20px;font-weight: 600;">
		共 <strong style="color:#1890ff;font-size:22px;">{{this.data.length ?this.data.length :0}}</strong> 条多工制令单 </span>
		<a-button type="primary" style="margin-left:10px;" @click="testExe">
		 <a-icon type="file-excel"></a-icon>
			导出
		</a-button>
      </a-card>
      </a-col>
    </a-row>    
    <a-row :gutter="20" type="flex" justify="start">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-bottom:20px;">
        <a-card title="" hoverable
        :headStyle="cardHeaderStyle"
        style="width:100%;text-align:center;">
		<template v-if="this.loading">
		  <div style="position:fixed;top:100px;width:100%;background:#fff;z-index: 999;">
		    <a-spin tip="Loading...">
		      <div class="spin-content">
		        接口调用中,请稍后。。。
		      </div>
		    </a-spin>
		  </div>
		</template>
		<div>
			<a-input-search placeholder="请输入多工制令单或产品名规格" style="width: 280px;margin:10px;text-align: left;" @search="onSearch"/>
		</div>
		<div v-if="this.tables.length>0" style="font-size: 16px;margin-bottom:10px;">
		<span style="margin-right:20px;font-size: 20px;"> {{user}}</span>	本次共查询到：<span style="color: #1890ff;;font-size: 24px;font-weight: 700;"> {{this.tables.length ?this.tables.length :0}}  </span>条多工制令单
		</div>
        <!-- 根据时间查找到的第一层可勾选表格项 -->
        <a-table
		ref='tableA'
        bordered
       :scroll="{ x: 1300 }"
	   size="middle"
       :columns="columns" :data-source="tables"
	   :expandRowByClick="true"
	   :defaultExpandedRowKeys="defaultExpandedRowKeys"
	   :pagination="pagination"
	   >
         <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
			 <h2 style="text-align: left;margin:10px 0;color:#31708f;font-weight: 600;" v-if="record.lj_detail">线材</h2>
				<table v-for="(v,i) in record.lj_detail" :key="i" class="futable" style="width: 100%;color: #302f32;">
						 <tr v-if="i==0" style="background: #d9edf7;color:#31708f;height:50px;">
							 <th style="width: 60px;text-align: center;"> </th>
							 <th style="width: 200px;">名称</th>
							 <th style="width: 100px;">单位用量</th>
							 <th style="width: 100px;">总用量</th>
							 <!-- <th style="display: none;"> uid：</th> -->
							 <th style="width: 60px;"> 单位</th>
							 <th> 规格</th>
							 <th> 备注</th>
						 </tr>
						<!-- 勾选项第一层 -->
						 <!-- <tr  style="border-bottom: 1px solid saddlebrown;margin-top:10px;"> -->
						 <tr  style="border-bottom: 1px solid saddlebrown;margin-top:10px;" :style="v[9]?('background:#e6e6e6','color:#b4b4b4'):('background:#fff')">
							 <td style="width: 60px;text-align: center;">
								 <input type="checkbox" style="outline:none;cursor: pointer;" :checked="v[8]?true:false" @click="fnCheckbox($event,v,record.date)"/>
								 <!-- {{v[7]?v[7]:''}} -->
							 </td>
							 <td  style="width: 200px;">
								<span style="color:#52C41A;" v-if='v[9]'>
									{{v[0]}}
								</span>
								<span style="" v-else>
									{{v[0]}}
								</span>
							 </td>
							 <td style="width: 100px;">
								{{v[1]}}
							 </td>
							 <td style="width: 100px;">
							 		 <!-- 总用量 -->
								{{v[7]}}
							 </td>
							<!-- <td>
								{{ record.zl_no }}{{v[3]}}
							 </td> -->
							 <td style="width: 60px;">
								{{v[4]}}
							 </td>
							 <td>
								{{v[5]}}
							 </td>
							 <td>
								   {{v[6]}}
								<span style="color:#52C41A" v-show='v[9]'> [完成时间] : </span> {{v[9]? v[9]:''}}
							 </td>
						 </tr>
						 <!-- 非勾选并列第二层 -->
						<!-- <tr v-if="v[2].length>0" v-for="(a,i) in v[2]"> -->
						<tr v-if="v[2].length>0" v-for="(a,i) in v[2]" :style="v[9]?('background:#e6e6e6','color:#b4b4b4'):('background:#fff')">
							 <td>
								 <!-- 子阶： -->
							 </td>
						 		<td>
									{{a[2]}} {{a[0]}}
								</td>					 
						 		<td>
									{{a[1]}}
								</td>
								<td>
									  {{a[7]}}
								</td>
						 		<td>
									<!-- 单位： -->
									{{a[4]}}
								</td>					 
						 		<td>
									<!-- 规格： -->
									{{a[5]}}
								</td>					 
						 		<td>
									<!-- 规格： -->
									{{a[6]}}
								</td>					 
						 </tr>
				 </table>
				<h2 style="text-align: left;margin:10px 0;color:#3c763d;font-weight: 600;" v-if="record.series_btdx">剥皮镀锡</h2>
				
				 <table v-if="record.series_btdx" class="futable" style="width: 100%;color: #302f32;margin-top:0px;">
					<tr  style="background: #dff0d8;color:#3c763d;height:50px;">
						 <th>机种</th>
						 <th >组件</th>
						 <th>线芯总类</th>
						 <th>线芯类别</th>
						 <th>剥皮</th>
						 <th>镀锡</th>
						 <th style="width: 30px;">WD</th>
						 <th>备注</th>
					</tr>
					<tr v-for="(v,i) in record.series_btdx" >
						 <td>{{v.series}}</td>
						 <!-- <td v-if="i==0" :rowspan="i" >{{v.series}}</td> -->
						 <!-- <td v-if="i!==0" style="display: none;"> 同上</td> -->
						 <td>{{v.component}}</td>
						 <td>{{v.wire_type}}</td>
						 <td>{{v.wire_category}}</td>
						 <td>{{v.peeling}}</td>
						 <td>{{v.tinning}}</td>
						 <td>{{v.extra_type}}</td>
						 <td>{{v.memo}}</td>
					</tr>
				 </table>
				 <!-- <compTree></compTree> -->
		 </div>
        </a-table>
		<!-- <compTree></compTree> -->
      </a-card>
      </a-col>
    </a-row>   
  </div>
</template>
<script>
	import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
	import moment from 'moment';
	import 'moment/locale/zh-cn';
	// import compTree from './comTree.vue'
  const columns=[
	  {
		  title: '多工制令单',
		  dataIndex: 'zl_no',
		  key: 'zl_no',
		  width:110,
		  sorter: (a, b) =>{
			 return  Number.parseInt(a.zl_no.replace(/(WJ)/ig,"")) - Number.parseInt(b.zl_no.replace(/(WJ)/ig,""))
		  }
	  },
	  {
		  title:'用量',
		  dataIndex:'ProdtQtyFROM',
		  key:'ProdtQtyFROM',
		  width:100,
		  sorter:(a,b)=>a.ProdtQtyFROM - b.ProdtQtyFROM
	  },
	  {
		title: '日期 ',
		dataIndex: 'date',
		key: 'date',
		 width:100,
		
		},
	  {
	  		title: '产品名称',
	  		dataIndex: 'pd_id',
	  		key: 'pd_id',
			 width:150,
			 sorter: (a, b) =>{
			 			 return  Number.parseInt(a.pd_id) - Number.parseInt(b.pd_id)
			 }
	  },
	  {
		  title:'产品规格',
		  dataIndex:'pd_name',
		  key:'pd_name'
	  },
  ]
  const data=[{
		key: 1,
		zl_no: 'WJ2005293',
		ProdtQtyFROM:'4000',
		date:20200520,
		pd_id:'90000000069',
		pd_name:'欢乐汇二期',
			testtable:[
				{v1:1,},
				{v2:2,}
			],
	}]
  const rowSelection={
		onChange: (selectedRowKeys, selectedRows) => {
		// console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	    },
		onSelect: (record, selected, selectedRows) => {
		  // console.log(record, selected, selectedRows);
		},
  }
export default {
  name: 'comform',
  components: {
	  // compTree
    },
  data(){
		return {
		excelData:[],//导出ececel表用
		username:"",//用户名
		defaultExpandedRowKeys:[],//展开项
		outTableData: {
			id: 'outTable',
			name: '交易数据'
		},
		pagination:{//pagination配置项
			pageSize: 25, // 默认每页显示数量
		},
		baseurl:"http://192.168.6.199/",
		// baseurl:"../",
		search:null,
		loading:false,
		 defaultDateValue:null,
		 locale,moment,
		 datapicker:[],
		 selectedRowKeys:[],
		 columns,
		 data,
		 rowSelection,
		 cardHeaderStyle:{
			"textAlign":"left"
		 },
		 size: 'default',
		}
  },
  computed:{
	  tables(){
		  const search = this.search//搜索词
		  if(search){
			  //过滤
			  console.log('这是data table计算数据的根据值 ===================',this.data)
			  return this.data.filter(data=>{
				  // console.log(Object.keys(data))//打印出所有等data内等key
				  //1:所有项
				  // return Object.keys(data).some(key=>{
					 //  console.log(data[key])
					 //  console.log(key)
					 //   return String(data[key]).toLowerCase().indexOf(search) > -1
				  // })
				  //2:指定项
				  return ["zl_no","pd_id","pd_name"].some(key=>{
				  	return String(data[key]).toLowerCase().indexOf(search) > -1
				  })
				  //3：单个项
				  // return String(data["zl_no"]).toLowerCase().indexOf(search) > -1
			  })
		  }
		  return this.data
	  },
	  user(){
		  // sessionStorage.setItem("username", "jsonz"); 
		  this.username = sessionStorage.getItem("username"); 
		  return this.username ? "您好 ! " + this.username : ''
	  }
  },
  mounted(){
	  this.data = []
	  // console.log(this.$refs.tableA.expandedRowKeys)
  },
  methods:{	
    fnInitEcelTable(){//第一次组重组数据
	    // console.log("！！！！！！！！！！！！",this.data)//这里数据已经被改变了
		// this.excelData = this.data //你要导出的数据list,all。
		this.excelData = this.tables //你要导出的数据list- 只导出search。
		this.excelData.forEach((v,i)=>{
			this.excelData[i]= {
				ProdtQtyFROM:v.ProdtQtyFROM,
				date:v.date,
				pd_id:v.pd_id,
				pd_name:v.pd_name,
				series:v.series,
				zl_no:v.zl_no
			}
				this.excelData[i].lj_detail =[//qingkong
				]
			v.lj_detail.forEach((val,j)=>{
				console.log(val,j)
				this.excelData[i].lj_detail.push({
					name:val[0],
					danweiYongliang:val[1],
					// yongliang:val[2],
					uid:val[3],//uid
					danwei:val[4],
					guige:val[5],
					beizhu:val[6],
					zongyongliang:val[7],
					dagou:val[8],
					timer:val[9]
				})
				//sanceng --这边创建后会有问题 --只有最后一项lj_detail内的数据依此导入进去
				val[2].forEach((value,k)=>{
					this.excelData[i].lj_detail.push({
						name:value[2] + value[0],
						danweiYongliang:value[1],
						// yongliang:val[2],
						uid:value[3],
						danwei:value[4],
						guige:value[5],
						beizhu:val[6],
						zongyongliang:val[7],
						dagou:value[8],
						timer:value[9]
					})
				})
			})
			
		})
	},  
	downloadExcel() {//列表下载
				  alert('导入中。。。')				 
				  this.fnInitEcelTable()
				   // console.log(this.excelData)
	              this.export2Excel()
	},
	export2Excel() {//数据写入excel
	            var that = this;
	            require.ensure([], () => {
	              const { export_json_to_excel } = require('@/excel/export2Excel'); //这里必须使用绝对路径，使用@/+存放export2Excel的路径
	              const tHeader = ['多工制令单','用量','日期','产品名称','产品规格','用料-名','子项:[名称-单位用量-总用量-单位-规格-备注]']; // 导出的表头名信息
	              const filterVal = ['zl_no','ProdtQtyFROM', 'date', 'pd_id','pd_name','series','lj_detail']; // 导出的表头字段名，需要导出表格字段名
	              const list = that.excelData;
	              const data = that.formatJson(filterVal, list);
	              export_json_to_excel(tHeader, data, '多工制令单excel');// 导出的表格名称，根据需要自己命名
				  this.fnAjaxUpdata()//打印完成后一定要重新刷新一下数据，不然搜索框将不能用，搜索框再次搜索数据内层的数据会被format而导致的乱掉
	            })
	 },
	 filterTab(objArr){//自定义过滤器 -第二次重组第数据
		let temp = []
	    objArr.forEach((v)=>{
			// console.log(v)
			temp.push(JSON.stringify([
				v.name,
				v.danweiYongliang,
				v.zongyongliang,
				v.danwei,
				v.guige,
				v.beizhu,
			]
			))
		})
		 return temp
	 },
	 //格式转换
	 formatJson(filterVal, jsonData) {
	           return jsonData.map(v => filterVal.map(j =>{
				    if(j=="lj_detail"){
						v[j] = this.filterTab(v[j])
					}
					return (v[j])
			   }))
	},
	testExe(){
		  this.downloadExcel()
	},
	// ----------------------事件  
	onSearch(v){//搜索框
	  console.log('seach:',v)
	  this.search = v;
	},
    onChange(date, dateString) {//时间选择事件
      console.log(date, dateString);
	  this.datapicker = dateString;//发送接口用
    },
	fnAjaxDate(){//1- 获取事件确认按钮
	  this.search =""//如果搜索不到再次点击确认搜索发送后端等数据保证能重新加载到页面（当输入再次清空tables还被限制着或者监听模糊搜索等搜索框清空后改变过滤条件等search值）
	  if(!this.datapicker||this.datapicker.length==0) return
	  this.datapicker[0] = this.datapicker[0].replace(/-/g,"")
	  this.datapicker[1] = this.datapicker[1].replace(/-/g,"")
	  this.fnAjaxUpdata()
	},
	// ------------------业务
	fnAjaxUpdata(){//2 - 接口 一：向后端发送时间根据事件获取数据
		let url = this.baseurl+'jk_wire_issue/get_wj_by_date.php?startDate='+this.datapicker[0]+'&endDate='+this.datapicker[1]
		this.loading = true
		this.$http.get(url).then((res)=>{
				  console.log(res)
				  if(!res) return
				  if(res.data==null||res.data==""){
					  this.data =[]
					  this.$message.warning('当前所选时间没数据，请重新选择时间');
					  this.loading=false;
					  return
				  }else{
					  this.data = res.data
					  this.data.forEach((val,ind)=>{//动态添加key
						 val.key = val.zl_no
					  })
					  this.fnAjaxGetChecked()
					  this.loading=false
					  this.template = []
					  // setTimeout(()=>{//单独设置--展开所有功能
					  // 		  this.data.forEach((val,key)=>{
					  // 			   this.defaultExpandedRowKeys.push(val.key)
					  // 		  })
					  // },200)
					  if(!res.data[0].lj_detail) return
					  console.log(res)
					  
				  }
		}).catch((err)=>{
			console.log(err)
			this.$message.warning('获取数据失败，如果您使用ie请改为非ie浏览器再试')
		})
	},
	fnAjaxGetChecked(){//3- 接口二 獲取勾選接口
		let url = this.baseurl+'jk_wire_issue/get_wire_check_info.php?startDate='+this.datapicker[0]+'&endDate='+this.datapicker[1]
		this.$http.get(url).then((res)=>{
			if(!this.data) return
			// console.log('uid',res.data)
			this.data.forEach((v,i)=>{
				if(!v.lj_detail) return
				v.lj_detail.forEach((j,i)=>{
					// console.log(j[3])
					if(res.data==null){
					}
					if(!res.data) return
					res.data.forEach((k,i)=>{
						if(k.uid==j[3]){
							// console.log('有打勾的项目是：',j)
							j.push('打钩了')
							j.push(k.checked_date)
							// console.log('有打勾的项目是：',j)
						}
					})
				})
			})
		})
	},
	fnCheckbox(e,v,date){//4 - 接口三 :打勾更新后端
		// console.log(e.target.checked,v[3],date)  
		let is_checked = e.target.checked//点击事件
		let dateStr =  date
		let uid = v[3]
		let url = this.baseurl+'jk_wire_issue/update_wire_check_info.php?is_checked='+is_checked+'&date='+dateStr+'&uid='+uid
		this.$http.get(url).then((res)=>{
			console.log(res)
			if(res.data==1){
				// this.$message.success('更新成功')
				this.fnAjaxUpdata()
			}
		})
	},
  },
}
</script>
<style scoped lang="less">
	.zitable{
		border-collapse:collapse; 
		    border-spacing:0; 
		td{
			border-right:1px solid #ccc;
			border-bottom:1px solid #ccc;
		}
	}
	.futable{
		border-collapse:collapse; 
		    border-spacing:0; 
			th{
				border:1px solid #ccc;
			}
		td{
			border:1px solid #ccc;
			// border-right:1px solid #ccc;
			// border-bottom:1px solid #ccc;
		}
	}
.ant-calendar-picker{margin-right:10px;}
.ant-btn{margin-top:10px;}
  .ant-table-body{
    word-break: break-all;
    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(144, 147, 153, 0.5);
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      background: transparent;
    }
  }
.ant-checkbox-input{display: none!important;}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>
