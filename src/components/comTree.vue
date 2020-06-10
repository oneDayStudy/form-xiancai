<template>
	<div>
		<!-- <vue2-org-tree :data="data1"/> -->
		<!-- <vue2-org-tree :horizontal="true" :data="data1"/> -->
		<vue2-org-tree  :label-class-name="labelClassName"   :horizontal="true" :data="data1"/>
		<!-- <vue2-org-tree  :label-class-name="labelClassName"  collapsable @on-expand="onExpand" :horizontal="true"  @on-node-click="NodeClick" :data="data1"/> -->
	</div>
</template>

<script>
	import vue from 'vue'
	import Vue2OrgTree from 'vue2-org-tree'
	vue.use(Vue2OrgTree)
	export default {
		data() {
			return {
				labelClassName: "labelClassName",
				data1: {
					id: 0,
					label: "机种",
					children: [{
							id: 5,
							label: "LK2Q",
							children: [{
									id: 7,
									label: "组件",
									children: [{
										id: 7,
										label: "O型组件",
									}]
								},
								{
									id: 8,
									label: "线芯总类",
									children: [{
										id: 7,
										label: "2*1平方 电源线",
									}]
								},
								{
									id: 9,
									label: '线芯类别',
									children: [{
										id: 7,
										label: "2芯线",
									}]
								},
								{
									id: 9,
									label: '剥皮',
									children: [{
										id: 7,
										label: 25,
									}]
								},
								{
									id: 9,
									label: '镀锡',
									children: [{
										id: 7,
										label: 2,
									}]
								},
								{
									id: 9,
									label: 'WD',
									children: [{
										id: 7,
										label: "wd",
									}]
								},
								{
									id: 9,
									label: '备注',
									children: [{
										id: 7,
										label: "qaeqwf",
									}]
								}
							]
						},
						//2
					]
				},
				record: [{
					"series": "HM5",
					"extra_type": "",
					"component": "L型组件",
					"wire_type": "2*1平方 电源线",
					"wire_category": "2芯线",
					"peeling": 25,
					"tinning": 2,
					"memo": ""
				}, {
					"series": "HM5",
					"extra_type": "",
					"component": "L型组件",
					"wire_type": "2*1平方 电源线",
					"wire_category": "2芯线",
					"peeling": 50,
					"tinning": 6,
					"memo": ""
				}, {
					"series": "HM5",
					"extra_type": "",
					"component": "L型组件",
					"wire_type": "信号线",
					"wire_category": "4/6芯线",
					"peeling": 25,
					"tinning": 2,
					"memo": ""
				}, {
					"series": "HM5",
					"extra_type": "",
					"component": "L型组件",
					"wire_type": "信号线",
					"wire_category": "4/6芯线",
					"peeling": 50,
					"tinning": 6,
					"memo": ""
				}, {
					"series": "HM5",
					"extra_type": "",
					"component": "L型组件",
					"wire_type": "2*1平方 电源线",
					"wire_category": "2芯线",
					"peeling": 25,
					"tinning": 2,
					"memo": ""
				}, {
					"series": "HM5",
					"extra_type": "",
					"component": "L型组件",
					"wire_type": "2*1平方 电源线",
					"wire_category": "2芯线",
					"peeling": 50,
					"tinning": 6,
					"memo": ""
				}, {
					"series": "HM5",
					"extra_type": "",
					"component": "L型组件",
					"wire_type": "信号线",
					"wire_category": "4/6芯线",
					"peeling": 25,
					"tinning": 2,
					"memo": ""
				}, {
					"series": "HM5",
					"extra_type": "",
					"component": "L型组件",
					"wire_type": "信号线",
					"wire_category": "4/6芯线",
					"peeling": 50,
					"tinning": 6,
					"memo": ""
				}]
			}
		},
		mounted() {
			this.dataInit()
		},
		methods: {
			dataInit() {
				this.data1.label = '机种:' +this.record[0].series
				this.data1.children = [];
				this.data1.children.push({//机种
					id: 1,
					label: "组件："+this.record[0].component,
					children:[]
				})
				// this.data1.children[0].children = [];
				this.data1.children[0].children.push({
					id: 2,
					label: "线芯总类："+this.record[0].wire_category,
					children:[]
				})
				this.data1.children[0].children.push({
					id: 2,
					label: "线芯类别："+this.record[0].wire_category,
					children:[]
				})
				this.data1.children[0].children.push({
					id: 2,
					label: "剥皮："+this.record[0].wire_category,
					children:[]
				})
				this.data1.children[0].children.push({
					id: 2,
					label: "镀锡："+this.record[0].wire_category,
					children:[]
				})
				this.data1.children[0].children.push({
					id: 2,
					label: "wd："+this.record[0].wire_category,
					children:[]
				})
				this.data1.children[0].children.push({
					id: 2,
					label: "备注："+this.record[0].wire_category,
					children:[]
				})
				// console.log(this.data1.children)
			},
			collapse(list) {
				var _this = this;
				list.forEach(function(child) {
					if (child.expand) {
						child.expand = false;
					}
					child.children && _this.collapse(child.children);
				});
			},
			onExpand(e, data) {
				if ("expand" in data) {
					data.expand = !data.expand;
					if (!data.expand && data.children) {
						this.collapse(data.children);
					}
				} else {
					this.$set(data, "expand", true);
				}
			},
			toggleExpand(data, val) { // this.toggleExpand(this.data,true) //第一个参数是你的资源data，第二个参数是全部展开或否
				var _this = this;
				if (Array.isArray(data)) {
					data.forEach(function(item) {
						_this.$set(item, "expand", val);
						if (item.children) {
							_this.toggleExpand(item.children, val);
						}
					});
				} else {
					this.$set(data, "expand", val);
					if (data.children) {
						_this.toggleExpand(data.children, val);
					}
				}
			},
			NodeClick(e, data) {
				console.log(e)
				// e 为 event
				console.log(data)
				// 当前项的所有详情 如：id label children
			}
		}
	}
</script>

<style>
	.labelClassName {
		color: #fff;
		background-color: orange;
	}
</style>
