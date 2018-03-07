import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import createHistory from 'history/createHashHistory';

import './style.less';

class LoginPage extends React.Component {
	constructor (props, context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			name: '',
			password: ''
		}
	}
	render(){
		return (
			<div id="Login">
				<div className="container">
					<h1>Sign in</h1>
					<form>
						<div>
							<label htmlFor="name">Username</label>
							<input 
								type="text" 
								id="name" 
								placeholder="Your username" 
								onChange={this.changeHandler2name.bind(this)}
								onKeyUp={this.keyUpHandler.bind(this)}
								value={this.state.name}
							/>
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<input 
								type="password" 
								id="password" 
								placeholder="Your password" 
								onChange={this.changeHandler2password.bind(this)}
								onKeyUp={this.keyUpHandler.bind(this)}
								value={this.state.password}
							/>
						</div>
						<div>
							<label></label>
							<input 
								type="button" 
								value="Login"
								onClick={this.submitFn.bind(this)}
							/>
						</div>
					</form>
					<p>BitTorrent Keys Share</p>
				</div>
			</div>
		)
	}
	// 下面能否用一个函数处理？
	// 密码！密码要处理！加密！
	// 下面两个函数功能高度相似，能否合并？ 
	// 下面的代码在多处都使用到，能否整合？
	changeHandler2name(e){
		this.setState({name:e.target.value})
	}
	changeHandler2password(e){
		this.setState({password:e.target.value})
	}

	keyUpHandler(e){
		const name = this.state.name;
		const password = this.state.password;

		const history = createHistory();

		if(e.keyCode === 13 && name.trim() && password.trim() ){
			this.setState({
				name:'',
				password:'',
			});
			this.props.submitFn({username:name,password:password});
		}
	}
	submitFn(){
		const name = this.state.name;
		const password = this.state.password;
		const description = this.state.description;
		this.setState({
			name:'',
			password:'',
		});
		this.props.submitFn({username:name,password:password})
	}
}
export default LoginPage