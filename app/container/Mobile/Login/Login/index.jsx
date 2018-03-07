import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import LoginPage from '../../../../component/LoginPage';

import createHistory from 'history/createHashHistory';
import { checkUser } from '../../../../fetch/CheckUser/checkUser';

class Login extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return (
			<LoginPage submitFn={this.submitFn.bind(this)}></LoginPage>
		)
	}
	submitFn(obj){
		const result = checkUser(obj);
		result.then(res => {
			return res.json()
		}).then(json => {
			// 登陆成功
			if(json.errno === 0){
				// 将登陆后的用户信息存储在 redux 中
				this.props.actions.login({
					username:obj.username
				})
				// 跳转到 home 页面
				const history = createHistory();
				history.push('./home');
			}else{
				// 用户不存在 或 密码输入错误
				console.log(json.msg);
			}
		})
	}
}
export default Login