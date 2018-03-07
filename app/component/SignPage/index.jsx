import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import createHistory from 'history/createHashHistory';

import './style.less';

class SignPage extends React.Component {
	constructor(props, context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			name: '',
			email: '',
			password: '',
			repassword: ''
		}
	}
	render(){
		return(
			<div id="Sign">
				<div className="container">
					<h1>Registration</h1>
					<form autoComplete="on">
						<div>
							<label htmlFor="name">Username</label>
							<input 
								type="text" 
								id="name" 
								placeholder="Username"
								onChange={this.changeHandler2name.bind(this)}
								onKeyUp={this.keyUpHandler.bind(this)}
								value={this.state.name}
							/>
						</div>
						<div>
							<label htmlFor="email">Email</label>
							<input 
								type="text" 
								id="email" 
								placeholder="Email" 
								onChange={this.changeHandler2email.bind(this)}
								onKeyUp={this.keyUpHandler.bind(this)}
								value={this.state.email}
							/>
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<input 
								type="password" 
								id="password" 
								placeholder="Password"
								onChange={this.changeHandler2password.bind(this)}
								onKeyUp={this.keyUpHandler.bind(this)}
								value={this.state.password}
							/>
						</div>
						<div>
							<label htmlFor="repassword">Confirm</label>
							<input 
								type="password" 
								id="repassword" 
								placeholder="PasswordConfirm" 
								onChange={this.changeHandler2repassword.bind(this)}
								onKeyUp={this.keyUpHandler.bind(this)}
								value={this.state.repassword}
							/>
						</div>
						<div>
							<label></label>
							<input 
								type="button" 
								value="Create" 
								onClick={this.submitFn.bind(this)}
							/>
						</div>
					</form>
					<h2>Your email address will be used only for registration.</h2>
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
	changeHandler2email(e){
		this.setState({email:e.target.value})
	}
	changeHandler2password(e){
		this.setState({password:e.target.value})
	}
	changeHandler2repassword(e){
		this.setState({repassword:e.target.value})
	}

	keyUpHandler(e){
		const username = this.state.name;
		const email = this.state.email;
		const password = this.state.password;
		const repassword = this.state.repassword;

		if(e.keyCode === 13 && username.trim() && email.trim() && password.trim() && repassword.trim() ){
			console.log(this.state);
			this.props.submitFn({username:username,email:email,password:password,repassword:repassword});

			this.setState({
				name:'',
				email:'',
				password:'',
				repassword: ''
			});
			
		}
	}
	submitFn(){
		const username = this.state.name;
		const email = this.state.email;
		const password = this.state.password;
		const repassword = this.state.repassword;
		if(username.trim() && email.trim() && password.trim() && repassword.trim() ){
			console.log(this.state);

			this.props.submitFn({username:username,email:email,password:password,repassword:repassword});
			this.setState({
				name:'',
				email:'',
				password:'',
				repassword: ''
			});
			
		}
	}
}

export default SignPage