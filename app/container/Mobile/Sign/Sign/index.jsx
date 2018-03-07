import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import SignPage from '../../../../component/SignPage';

import createHistory from 'history/createHashHistory';
import { postUser } from '../../../../fetch/AddUser/addUser';

class Sign extends React.Component{
	constructor(props, context){
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return (
			<SignPage submitFn={this.submitFn.bind(this)}></SignPage>
		)
	}
	submitFn(obj){
		const result = postUser(obj);
		result.then(res => {
			return res.json()
		}).then(json => {
			if(json.errno === 0){
				// 将登陆后的用户信息存储在 redux 中
				this.props.actions.login({
					username: obj.username
				})
				// 跳转到 home 页面
				console.log("登陆成功！")
			}
		})
		const history = createHistory();
		history.push('/home')
	}
}
export default Sign