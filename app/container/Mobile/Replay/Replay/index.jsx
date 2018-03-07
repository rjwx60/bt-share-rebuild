import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import createHistory from 'history/createHashHistory';

import ReplayPage from '../../../../component/ReplayPage';

class Replay extends React.Component{
	constructor(props, context){
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		return (
			<ReplayPage submitFn={this.submitFn} userinfo={this.props.userinfo}></ReplayPage>
		)
	}
	// 不能传递 undefined 到子组件 即便不传递也会报错 既然这样那就不传好了？！直接在子组件中调取redux
	componentDidMount(){

	}
	// 这里只有 简单的许可，后期将评论内容添加到对应的资源下
	submitFn(obj){
		const history = createHistory();
		history.push('./home')
	
	}
}
export default Replay