import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Source from '../../../../component/SourceMobile'
// import { getSourceList } from '../../../../fetch/SourceList/home.js';
import { getSourceListUpdate } from '../../../../fetch/SourceList/home.js';

class SourceList extends React.Component {
	constructor(props, context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data:[],
			length: 0,
			// 移动端增加的内容,分别是资源标识位 和 默认首页
			hasMore:true,
			page:1
		}
	}
	render(){
		return (
			<div>
			{
				this.state.data.length
				? <Source 
						state={this.state}
						data={this.state.data} 
						length={this.state.length} 
						getSourceList={this.getSourceList.bind(this)}>
					</Source>

				: <div>Source Loading...</div>
			}
			</div>
		)
	}
	componentDidMount(){
		this.getSourceList({});
	}

	// 这里是获取首页内容
	getSourceList(obj){
		// 即便返回的是数组，仍要.json() 实际上返回的最初形式是Promise，要先对其进行处理的
		const result = getSourceListUpdate(obj);
		// console.log(result);  // Promise

		result.then(res => {
			return res.json()
		}).then(json => {
			var data = json.data;
			var length = json.allDataLength;
			var data_old = this.state.data;
			// console.log(json)  // 数组

			if(this.state.data.length == 0){
				this.setState({
					data: data,
					length: length,
					hasMore:data.hasMore,
				})
			}else{
				// console.log("start",data_old.concat(data))
				this.setState({
					data: data_old.concat(data),
					length: length,
					hasMore:data.hasMore
				})
			}
		})
	}
}
export default SourceList