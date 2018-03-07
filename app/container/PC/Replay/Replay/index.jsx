import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import createHistory from 'history/createHashHistory';

import ReplayPage from '../../../../component/ReplayPage';

import { addReplay } from '../../../../fetch/AddReplay/addReplay.js';

class Replay extends React.Component{
	constructor(props, context){
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}



	// 如果不加 bind(this) 就无法使用 this.state 或 this.props.之类的值
	// 如果不加 bind(this) 就无法使用 this.state 或 this.props.之类的值
	// 如果不加 bind(this) 就无法使用 this.state 或 this.props.之类的值
	// 如果不加 bind(this) 就无法使用 this.state 或 this.props.之类的值
	render() {
		return (
			<ReplayPage 
				submitFn={this.submitFn.bind(this)} 
				userinfo={this.props.userinfo}>
			</ReplayPage>
		)
	}
	// 不能传递 undefined 到子组件 即便不传递也会报错 既然这样那就不传好了？！直接在子组件中调取redux
	componentDidMount(){
		// console.log(this.props.userinfo.username)
	}
	// 这里只有 简单的许可，后期将评论内容添加到对应的资源下
	submitFn(obj){
		// addReplay(obj);
		let time = new Date();
		let timer = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes();

		var result = addReplay({
			id:this.props.id,
			username:this.props.userinfo.username,
			text:obj.replay,
			postTime:timer,
			agreeNumber:0,
			disagreeNumber:0
		})
		result.then(res => {
			return res.json()
		}).then(json => {
			console.log(json)
		})


		const history = createHistory();
		history.push('./home')
	}
}
export default Replay