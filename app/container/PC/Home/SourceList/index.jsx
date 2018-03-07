import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Source from '../../../../component/Source'
// import { getSourceList } from '../../../../fetch/SourceList/home.js';
import { getSourceListUpdate } from '../../../../fetch/SourceList/home.js';

class SourceList extends React.Component {
	constructor(props, context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			// hasMore:false,
			data:[],
			length:0
		}
	}
	render(){
		return (
			<div>
			{
				this.state.data.length
				? <Source 
						page={this.props.page}
						data={this.state.data} 
						length={this.state.length} 
						getSourceList={this.getSourceList.bind(this)}></Source>
				: <div>加载中</div>
			}
			</div>
		)
	}
	componentDidMount(){
		/*
			// 获取资源列表 旧的 返回的是对象，新的返回的是数组
			const result = getSourceList();
			result.then(res => {
				return res.json()
			}).then(json => {
				const hasMore = json.hasMore;
				const data = json.data;
				this.setState({
					hasMore:hasMore,
					data:data
				})
			})
		*/
		this.getSourceList({});
	}
	getSourceList(obj){
		// 即便返回的是数组，仍要.json() 实际上返回的最初形式是Promise，要先对其进行处理的
		const result = getSourceListUpdate(obj);
		// console.log(result);  // Promise

		result.then(res => {
			return res.json()
		}).then(json => {
			console.log(json)  // 数组
			const data = json.data;
			// console.log(data)
			const length = json.allDataLength;
			console.log(length)
			this.setState({
				data: data,
				length: length
			})
			// console.log(this.state.length);
		})
	}
}
export default SourceList